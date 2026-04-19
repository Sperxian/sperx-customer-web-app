import { MemberLoyalty } from "@/types/domain";
import apiClient from "./client";

/**
 * Fetch member data from backend API
 * Falls back to stub data if API call fails (for development)
 */
export async function getMemberLoyalty(memberId: string): Promise<MemberLoyalty|null> {
  try {
    const response = await apiClient.get<MemberLoyalty>(
      `/members/${memberId}/loyalty`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    // console.error("Request error:", error.message);
    // Fallback to stub data for development
    return null;
  }
}