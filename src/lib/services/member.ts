export const createMemberLoyalty = async (loyaltyProgramId: string) => {
  const response = await fetch(`/api/loyalty/${loyaltyProgramId}/join`, {
    method: "post",
  });

  const data = await response.json();

  return data;
}
