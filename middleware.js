export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';
  
  if (accept.includes('text/markdown')) {
    const url = new URL('/api/index-md', request.url);
    return new Response(null, {
      headers: {
        'x-middleware-rewrite': url.toString(),
      },
    });
  }
}
