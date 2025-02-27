import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Blog')
        .items([
            S.documentTypeListItem('siteSettings').title('Site settings'),
            S.documentTypeListItem('page').title('Pages'),
            S.divider(),
            S.documentTypeListItem('post').title('Posts'),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('author').title('Authors'),
            S.divider(),
            ...S.documentTypeListItems().filter(
                (item) =>
                    item.getId() &&
                    ![
                        'siteSettings',
                        'page',
                        'post',
                        'category',
                        'author',
                    ].includes(item.getId()!),
            ),
        ])
