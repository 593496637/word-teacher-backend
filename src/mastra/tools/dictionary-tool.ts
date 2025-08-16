import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import type { DictionaryResponse, WordMeaning } from "../../types/dictionary";

/**
 * 词典查询工具
 * 
 * 使用 Free Dictionary API 获取单词的详细信息
 * API 文档: https://dictionaryapi.dev/
 */
export const dictionaryTool = createTool({
  id: "dictionary-lookup",
  description: "查询英语单词的详细信息，包括定义、音标、词性、例句等",
  inputSchema: z.object({
    word: z.string().describe("要查询的英语单词"),
  }),
  outputSchema: z.object({
    success: z.boolean().describe("查询是否成功"),
    data: z.object({
      word: z.string(),
      phonetic: z.string(),
      origin: z.string(),
      meanings: z.array(z.object({
        partOfSpeech: z.string(),
        definitions: z.array(z.object({
          definition: z.string(),
          example: z.string(),
          synonyms: z.array(z.string()),
          antonyms: z.array(z.string()),
        })),
        synonyms: z.array(z.string()),
        antonyms: z.array(z.string()),
      })),
      sourceUrls: z.array(z.string()),
    }).optional().describe("单词数据"),
    error: z.string().optional().describe("错误信息"),
  }),
  execute: async ({ word }) => {
    // 直接使用解构参数（原始方式）
    try {
      console.log(`正在查询单词: ${word}`);
      
      // 调用 Free Dictionary API
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: `未找到单词 "${word}" 的相关信息`,
          };
        }
        throw new Error(`API请求失败: ${response.status}`);
      }

      const rawData: DictionaryResponse[] = await response.json();
      
      if (!rawData || rawData.length === 0) {
        return {
          success: false,
          error: `未找到单词 "${word}" 的相关信息`,
        };
      }

      // 处理和格式化数据
      const wordData = rawData[0];
      const formattedData = {
        word: wordData.word,
        phonetic: wordData.phonetic || wordData.phonetics?.[0]?.text || "",
        origin: wordData.origin || "",
        meanings: wordData.meanings?.map((meaning: WordMeaning) => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions?.slice(0, 3).map(def => ({
            definition: def.definition,
            example: def.example || "",
            synonyms: def.synonyms?.slice(0, 3) || [],
            antonyms: def.antonyms?.slice(0, 3) || [],
          })) || [],
          synonyms: meaning.synonyms?.slice(0, 5) || [],
          antonyms: meaning.antonyms?.slice(0, 5) || [],
        })) || [],
        sourceUrls: wordData.sourceUrls || [],
      };

      console.log(`成功查询单词: ${word}`);
      
      return {
        success: true,
        data: formattedData,
      };
      
    } catch (error) {
      console.error(`查询单词 "${word}" 时发生错误:`, error);
      
      return {
        success: false,
        error: `查询单词时发生错误: ${error instanceof Error ? error.message : '未知错误'}`,
      };
    }
  },
});
