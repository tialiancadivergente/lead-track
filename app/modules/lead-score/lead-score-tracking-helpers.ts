import type {
  AnswerValue,
  QuizOption,
  QuizQuestion,
} from "@/app/modules/lead-score/lead-score.types";

export function parseNumericValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const parsedValue = Number(value.replace(",", ".").trim());
  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

function findQuestionById(
  questions: QuizQuestion[],
  questionId: string
): QuizQuestion | undefined {
  return questions.find((question) => question.id === questionId);
}

function findMatchedOption(
  question: QuizQuestion | undefined,
  answer: string
): QuizOption | undefined {
  return question?.options.find((option) => option.value === answer);
}

export function resolveAnswerScore(
  questions: QuizQuestion[],
  questionId: string,
  answer: string
): number {
  const question = findQuestionById(questions, questionId);
  const matchedOption = findMatchedOption(question, answer);

  if (matchedOption?.points !== undefined) {
    return matchedOption.points;
  }

  return parseNumericValue(answer) ?? 0;
}

export function calculateTotalScore(
  questions: QuizQuestion[],
  answers: Record<string, AnswerValue>
): number {
  return Object.entries(answers).reduce((total, [questionId, answerValue]) => {
    if (Array.isArray(answerValue)) {
      return (
        total +
        answerValue.reduce(
          (sum, answerItem) =>
            sum + resolveAnswerScore(questions, questionId, answerItem),
          0
        )
      );
    }

    return total + resolveAnswerScore(questions, questionId, String(answerValue));
  }, 0);
}

export function formatAnswersForTracking(
  questions: QuizQuestion[],
  answers: Record<string, AnswerValue>
): Record<string, string> {
  return Object.entries(answers).reduce<Record<string, string>>(
    (result, [questionId, answerValue]) => {
      const question = findQuestionById(questions, questionId);
      const questionLabel = question?.question || questionId;

      if (Array.isArray(answerValue)) {
        const selectedLabels = answerValue.map((answerItem) => {
          const matchedOption = findMatchedOption(question, answerItem);
          return matchedOption?.label || answerItem;
        });

        result[questionLabel] = selectedLabels.join(", ");
        return result;
      }

      const answerText = String(answerValue);
      const matchedOption = findMatchedOption(question, answerText);
      result[questionLabel] = matchedOption?.label || answerText;
      return result;
    },
    {}
  );
}
