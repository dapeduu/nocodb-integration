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
    const { data } = await api.post(`/PagamentosDosMembros`, {
      Valor: value,
      nc_sqlv__membro_id: memberId,
    });

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function distributeValue(value, projectId) {
  const projectData = await getProjectById(projectId);
  if (!projectData) {
    throw new Error("No project found with the params given");
  }

  const membersList = projectData?.Membros;

  const memberValue = Number(value * 0.11);
  const memberPercentage = (memberValue / membersList.length).toFixed(2);

  const res = await Promise.all(
    membersList.map((member) => payMember(memberPercentage, member.id))
  );

  return res;
}
