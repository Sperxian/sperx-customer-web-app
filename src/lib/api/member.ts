import { MemberResponse } from "@/types/domain";
import { EXISTING_MEMBER } from "../stubs";

/**
 * Fetch member data from backend API
 * Falls back to stub data if API call fails (for development)
 */
export async function getMember(memberId: string): Promise<MemberResponse> {
  try {
    const response = await apiClient.get<MemberResponse>(
      `/members/${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    // Fallback to stub data for development
    return EXISTING_MEMBER.card;
  }
}