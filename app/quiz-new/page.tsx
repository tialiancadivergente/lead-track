"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatRequestErrorMessage } from "@/app/modules/format-request-error-message";
import {
  isMultipleInputType,
} from "@/app/modules/lead-score/lead-score-input-type";
import {
  buildLeadScoreAnswerItems,
  readQuestTesteUrlContext,
} from "@/app/modules/lead-score/lead-score-transformers";
import type { AnswerValue } from "@/app/modules/lead-score/lead-score.types";
import { useGetLeadScoreQuestions } from "@/app/modules/lead-score/hook/use-get-lead-score-questions";
import { useCreateLeadScoreStart } from "@/app/modules/lead-score/hook/use-create-lead-score-start";
import {
  DEFAULT_QUEST_FORM_VERSION_ID,
  resolveQuestTesteWhatsappUrl,
} from "@/lib/config/quest-config";
import ContainerQuest from "./container";

export default function QuizNewPage() {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formVersionId, setFormVersionId] = useState<string>("");
  const [leadRegistrationRequestId, setLeadRegistrationRequestId] = useState("");
  const [temperature, setTemperature] = useState("f");
  const mutationCreateLeadScoreStart = useCreateLeadScoreStart();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const { formVersionId, leadRegistrationRequestId, temperature } =
      readQuestTesteUrlContext(
        window.location.search,
        DEFAULT_QUEST_FORM_VERSION_ID
      );

    if (!leadRegistrationRequestId) {
      window.history.back();
      return;
    }

    setFormVersionId(formVersionId);
    setLeadRegistrationRequestId(leadRegistrationRequestId);
    setTemperature(temperature);
  }, []);

  const {
    data: questions = [],
    isPending: isQuestionsPending,
    isFetching: isQuestionsFetching,
    error: questionsError,
    refetch: refetchQuestions,
    dataUpdatedAt: questionsDataUpdatedAt,
  } = useGetLeadScoreQuestions(formVersionId);

  const isFetchingQuestions =
    !formVersionId || isQuestionsPending || isQuestionsFetching;
  const isSubmittingAnswers = mutationCreateLeadScoreStart.isPending;
  const fetchError = useMemo(() => {
    if (!questionsError) {
      return null;
    }

    return formatRequestErrorMessage(questionsError);
  }, [questionsError]);

  useEffect(() => {
    if (!questionsDataUpdatedAt) {
      return;
    }

    setAnswers({});
    setCurrentQuestion(0);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, [questionsDataUpdatedAt]);

  const whatsappUrl = useMemo(() => {
    return resolveQuestTesteWhatsappUrl(temperature);
  }, [temperature]);

  const fetchQuestions = useCallback(async () => {
    await refetchQuestions();
  }, [refetchQuestions]);

  const currentQuestionData = questions[currentQuestion];
  const selectedValue = currentQuestionData
    ? answers[currentQuestionData.id]
    : "";
  const selectedSingleValue =
    typeof selectedValue === "string" ? selectedValue : "";
  const selectedMultipleValue = Array.isArray(selectedValue)
    ? selectedValue
    : [];

  const isCurrentQuestionAnswered = useMemo(() => {
    if (!currentQuestionData) {
      return false;
    }

    if (!currentQuestionData.required) {
      return true;
    }

    if (isMultipleInputType(currentQuestionData.inputType)) {
      return selectedMultipleValue.length > 0;
    }

    return selectedSingleValue.trim().length > 0;
  }, [
    currentQuestionData,
    selectedMultipleValue.length,
    selectedSingleValue,
  ]);

  const handleAnswer = (value: string) => {
    if (!currentQuestionData) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestionData.id]: value,
    }));
  };

  const handleMultipleAnswer = (value: string) => {
    if (!currentQuestionData) {
      return;
    }

    setAnswers((previous) => {
      const previousValue = previous[currentQuestionData.id];
      const selectedItems = Array.isArray(previousValue) ? previousValue : [];
      const exists = selectedItems.includes(value);
      const nextItems = exists
        ? selectedItems.filter((item) => item !== value)
        : [...selectedItems, value];

      return {
        ...previous,
        [currentQuestionData.id]: nextItems,
      };
    });
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const submitLeadScore = async () => {
    if (!leadRegistrationRequestId) {
      throw new Error("requestId nao encontrado na URL.");
    }

    const payload = {
      lead_registration_request_id: leadRegistrationRequestId,
      form_version_id: formVersionId,
      submitted_at: new Date().toISOString(),
      answers: buildLeadScoreAnswerItems(questions, answers),
      raw_payload: {
        source: "frontend",
        step: "quiz",
      },
    };

    await mutationCreateLeadScoreStart.mutateAsync(payload);
  };

  const handleNext = async () => {
    if (!currentQuestionData) {
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      return;
    }

    try {
      setSubmitError(null);
      setSubmitSuccess(false);
      await submitLeadScore();
      setSubmitSuccess(true);
      window.location.href = whatsappUrl;
    } catch (error) {
      console.error("Erro ao enviar respostas do quiz:", error);
      setSubmitError(formatRequestErrorMessage(error));
    }
  };

  return (
    <ContainerQuest
      isFetchingQuestions={isFetchingQuestions}
      fetchError={fetchError}
      fetchQuestions={fetchQuestions}
      currentQuestionData={currentQuestionData}
      submitError={submitError}
      submitSuccess={submitSuccess}
      totalQuestions={questions.length}
      selectedSingleValue={selectedSingleValue}
      selectedMultipleValue={selectedMultipleValue}
      handleAnswer={handleAnswer}
      handleMultipleAnswer={handleMultipleAnswer}
      currentQuestion={currentQuestion}
      handleBack={handleBack}
      handleNext={handleNext}
      isCurrentQuestionAnswered={isCurrentQuestionAnswered}
      isSubmittingAnswers={isSubmittingAnswers}
      whatsappUrl={whatsappUrl}
    />
  );
}
