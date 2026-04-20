import { MemberLoyalty, MemberPointsHistory } from "@/types/domain";
import apiClient from "./client";

/**
 * Fetch member data from backend API
 * Falls back to stub data if API call fails (for development)
 */
export async function getMemberLoyalty(memberId: string): Promise<MemberLoyalty|null> {
  try {
    const response = await apiClient.get<MemberLoyalty>(`/members/${memberId}/loyalty`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    // console.error("Request error:", error.message);
    // Fallback to stub data for development
    return null;
  }
}

export async function getMemberPointsHistory(memberId: string, page: number = 0, size: number = 20): Promise<MemberPointsHistory|null> {
  const params = { page, size };
  try {
    const response = await apiClient.get<MemberPointsHistory>(`/members/${memberId}/loyalty/history`, { params });
    return {
      ...response.data,
      items: response.data.items.map(item => ({
        ...item,
        dateCreated: new Date(item.dateCreated) // Convert string to Date object
      })),
    };

  } catch (error) {
    console.error("Failed to fetch member points history:", error);
    // Fallback to stub data for development
    return null;
  }
}