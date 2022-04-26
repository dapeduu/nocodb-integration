import { api } from "./config/axios.mjs";

export async function getProjectById(id) {
  try {
    const { data } = await api.get(`/Projetos/${id}`);

    return data;
  } catch (error) {
    console.log({ error });
  }
}

export async function payMember(value, memberId) {
  try {
    const { data } = await api.post(
      `/Membros/${memberId}/Pagamento dos Membros`,
      {
        Valor: value,
      }
    );

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function distributeValue(value, projectId) {
  const projectData = await getProjectById(projectId);
  if (!projectData) {
    console.log("distributeValueParams", {
      value,
      projectId,
    });
    throw new Error("No project found with the params given");
  }

  const membersList = projectData?.MembrosMMList;

  const memberValue = Number(value * 0.11);
  const memberPercentage = (memberValue / membersList.length).toFixed(2);

  await Promise.all(
    membersList.map((member) => payMember(memberPercentage, member.id))
  );
}
