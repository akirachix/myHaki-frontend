const baseUrl = '/api/signin';


export async function fetchSignin(email: string, password: string) {
 try {
   const response = await fetch(baseUrl, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password }),
   });


   if (!response.ok) {
     const errorData = await response.json();
     throw new Error(errorData.detail || 'User is unauthorized');
   }


   const result = await response.json();
   return result;
 } catch (error: any) {
   throw new Error(error.message);
 }
}



