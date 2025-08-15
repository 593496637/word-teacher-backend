/**
 * 词典 API 响应类型定义
 */

/**
 * 音标信息
 */
export interface Phonetic {
  text?: string;
  audio?: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
}

/**
 * 单词定义
 */
export interface Definition {
  definition: string;
  synonyms?: string[];
  antonyms?: string[];
  example?: string;
}

/**
 * 单词含义（按词性分组）
 */
export interface WordMeaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

/**
 * 词典 API 完整响应
 */
export interface DictionaryResponse {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  meanings: WordMeaning[];
  license?: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
  origin?: string;
}

/**
 * 格式化后的单词数据
 */
export interface FormattedWordData {
  word: string;
  phonetic: string;
  origin: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string;
      synonyms: string[];
      antonyms: string[];
    }[];
    synonyms: string[];
    antonyms: string[];
  }[];
  sourceUrls: string[];
}

/**
 * 教学风格类型
 */
export type TeachingStyle = 'humorous' | 'serious' | 'vivid' | 'simple' | 'detailed';

/**
 * 单词教学请求
 */
export interface WordTeachingRequest {
  word: string;
  style?: TeachingStyle;
}

/**
 * 单词教学响应
 */
export interface WordTeachingResponse {
  text: string;
  wordData?: FormattedWordData;
  style: TeachingStyle;
  timestamp: string;
}
