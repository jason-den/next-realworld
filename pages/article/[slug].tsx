/*
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- 
*/
import { useRouter } from 'next/dist/client/router';

export default function Page() {
  const router = useRouter();
  console.log(router);
  router.query['slug'];

  return <div>This is article page</div>;
}
