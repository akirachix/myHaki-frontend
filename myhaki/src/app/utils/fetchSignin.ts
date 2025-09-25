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
     throw new Error(errorData.detail || 'Invalid email or password');
   }


   const result = await response.json();
   return result;
 }catch (error) {
    throw new Error('Failed to signin; ' + (error as Error).message);
  }
}



