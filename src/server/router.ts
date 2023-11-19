export const router = (request: Request) => {
  console.log(request.url);
  return new Response("OK");
};
