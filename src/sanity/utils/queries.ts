import { defineQuery, groq } from 'next-sanity'

const author = groq`{
    ...
  }`

const post = groq`{
    ...,
    categories[]->{
        title,
        slug
    },
    "readTime":round(length(pt::text(body)) / 5 / 180 ),
    author->${author},
  }`

export const postsQuery = defineQuery(`{
      "featuredPosts": *[_type == 'post' && featured == true] | order(publishedAt desc)${post},
      "posts": *[_type == 'post' && featured != true] | order(publishedAt desc)${post}
}`)

export const allPostsQuery = defineQuery(
    `*[_type == 'post'] | order(publishedAt desc)${post}`,
)

export const postQuery = defineQuery(
    ` *[_type == 'post' && slug.current == $slug][0]${post}`,
)

// Suggestions
export const suggestionsQuery = defineQuery(`*[_type == 'suggestion']{
  ...
  }`)
