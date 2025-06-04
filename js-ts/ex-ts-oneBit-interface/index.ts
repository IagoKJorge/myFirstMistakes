interface User {
  name: string;
  location?: string;
  bio?: string;
  followers?: number;
  following?: number;
  url: string;
  repos?: any[];
}

async function getUserGitHub(userName: string) {
  try {
    let user: User;
    let fetchUser = await fetch(`https://api.github.com/users/${userName}`);
    if (!fetchUser.ok) {
      console.error(`Erro: ${fetchUser.status} - ${fetchUser.statusText}`);
      return null;
    }
    let userData = await fetchUser.json();
    const { name, location, bio, followers, following } = userData;
    user = {
      name: name ?? "Nome não disponível",
      location,
      bio,
      followers,
      following,
      url: `https://api.github.com/users/${userName}`,
    };
    return user;
  } catch (e) {
    console.error("Erro ao buscar dados do usuário:", e);
    return null;
  }
}

async function getUserRepos(user: User) {
  try {
    let fetchUserRepos = await fetch(user.url + "/repos");
    if (!fetchUserRepos.ok) {
      console.error(
        `Erro: ${fetchUserRepos.status} - ${fetchUserRepos.statusText}`
      );
      return null;
    }
    let reposData = await fetchUserRepos.json();
    user.repos = reposData.slice(3) ?? null;
  } catch (error) {
    console.error("Erro ao buscar os repositórios do usuário:", error);
    return null;
  }
}

function showUserInfoAndRepos(user: User) {
  let str = `Nome: ${user.name}\nLocalização: ${
    user.location ?? "Sem endereço"
  }\n`;

  if (!user.repos) return str + "Não tem repositório!!";

  for (let i = 0; i < user.repos.length; i++) {
    str += `${i + 1}_ ${user.repos[i]?.name} - ${
      user.repos[i]?.description
    } \n`;
  }

  return str;
}
