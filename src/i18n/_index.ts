import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      title: "Voca Test",
      base: "Lexicon from",
      start: "Get Started",
      continue: "Continue",
      end: "Finish",
      uv: "users have used this app",
      endConfirmTitle:
        "You have completed 100 questions, do you want to continue?",
      endConfirmDesc:
        "Now you can end the quiz and view the results, or you can continue answering questions to improve the accuracy of the results.",
      resultTitle: "Test finished",
      scoreLabal: "assume vocabulary",
      again: "Try Again",
      save: "Save",
      resultFrom: "Test by",
      comment1: "Beginner level, keep it up.",
      comment2: "Sufficient to help you pass the CET-4 and CET-6.",
      comment3:
        "Good performance, CET-4 and CET-6 are no longer a challenge for you.",
      comment4: "This can help you achieve good results in the IELTS test.",
      comment5: "This is enough for you to score high in the IELTS exam.",
      comment6: "Already able to understand most English materials.",
      comment7: "This is close to or equivalent to a native English speaker.",
    },
  },

  cn: {
    translation: {
      title: "词汇量测试",
      base: "词库基于",
      start: "开始",
      continue: "继续",
      end: "结束",
      uv: "人参与过此测试",
      endConfirmTitle: "你已达成100题，要继续吗？",
      endConfirmDesc:
        "现在可以结束答题并查看结果，也可以继续答题提高结果的准确度",
      resultTitle: "测试结束",
      scoreLabal: "推测词汇量",
      again: "再来一次",
      save: "保存结果",
      resultFrom: "结果来自",
      comment1: "初学者水平，加油",
      comment2: "足够帮助你通过四六级",
      comment3: "不错的成绩，四六级已经难不倒你了",
      comment4: "这能让你在雅思测试中获得不错的成绩",
      comment5: "这足够你在雅思考试中获得高分",
      comment6: "已经能够读懂大多数英文材料",
      comment7: "这接近或等同于英语母语者",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
