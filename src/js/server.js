

const createUser = async (userInfo) => {
  const response = await fetch(`http://localhost:3000/users/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo)
  });

  const data = await response.json();
  console.log(data);
};

const getUser = async (userInfo) => {
  

    const params = new URLSearchParams(userInfo)
    const response = await fetch(`http://localhost:3000/users?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await response.json();

    return data
  };

  const deleteUser = async (userInfo) => {
    const response = await fetch(`http://localhost:3000/users`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    });
  
    const data = await response.json();
    console.log(data);
  };

module.exports = {
    createUser,
    getUser,
    deleteUser
}


