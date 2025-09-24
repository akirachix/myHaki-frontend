// import { getAuthToken } from './authToken';

// export async function fetchUpdateUser(id: string, data: {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   password?: string;
// }) {
//   const baseUrl = '/api/users';
//   const token = getAuthToken();

//   try {
//     const response = await fetch(`${baseUrl}/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token ? { Authorization: `Token ${token}` } : {}),
//       },
//       body: JSON.stringify(data),
//       credentials: 'include',
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(errorData.message || 'Failed to update user profile');
//     }

//     const responseText = await response.text();
//     return responseText ? JSON.parse(responseText) : null;
//   } catch (error: any) {
//     console.error('Update user error:', error.message);
//     throw new Error(error.message);
//   }
// }
