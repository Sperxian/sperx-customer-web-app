import { MemberLoyalty, MemberPointsHistory } from "@/types/domain";
import apiClient from "./client";


export async function createMemberLoyalty(loyaltyId: string): Promise<MemberLoyalty> {
  try {
    const { data } = await apiClient.post<MemberLoyalty>(`/customer/loyalty/${loyaltyId}`);
    return data;
  } catch (error) {
    console.error('Failed to create new member loyalty', error)
    throw error;
  }
}

export async function getMemberLoyalty(memberId: string): Promise<MemberLoyalty | null> {
  try {
    const response = await apiClient.get<MemberLoyalty>(`/customer/members/${memberId}/loyalty`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    return null;
  }
}

export async function getMemberPointsHistory(memberId: string, page: number = 0, size: number = 20): Promise<MemberPointsHistory | null> {
  const params = { page, size };
  try {
    const response = await apiClient.get<MemberPointsHistory>(`/customer/members/${memberId}/loyalty/history`, { params });
    return {
      ...response.data,
      items: response.data.items.map(item => ({
        ...item,
        dateCreated: new Date(item.dateCreated) // Convert string to Date object
      })),
    };

  } catch (error) {
    console.error("Failed to fetch member points history:", error);
    return null;
  }
}