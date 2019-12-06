# TODOS

## Prioritized

- [ ] Excel history - redo/undo
- [x] Excel multiple selection
- [ ] Excel sheet mouse auto-scroll
- [ ] Package creation
- [ ] Some fetch/update components may use the MongoDB item to update -- if that's the case, update the ID in the frontend
- [ ] Modifying one hierarchy may affect other hierarchies -- update affected hierarchies (ie remove user from organization => remove organization in user)
- [ ] Convert excel editor state to Xlsx-populate rich text
- [ ] Resize excel headers
- [ ] Compress inactive sheets
- [ ] Upload excel in serialized state instead of base 64 xlsx-populate
- [ ] Update excel states when switching sheets
- [ ] Cannot select multiple single cells on the same column/row

## Unprioritized

- [ ] Token blacklist
- [ ] Webpack hostname - route production build with public URL (CRA can do it)
- [ ] Pagination
- [ ] Miscellaneous information - ie: job positions
- [ ] General and route error handlers- should everything be handled here or do it in the original route? (General error handler handles most errors but may not make sense for some routes)
- [ ] Strengthen verfication ids (change MongoDB Id to a more secure Id -- MongoDB Id is too predicatable)
- [ ] Keep styles considtent (ie, Profile and All packages headers/pages - mismatched styles)
- [ ] It's possible that an admin updates his/her own roles - refetch data in that case (very unlikely case)

## Important but Unprioritized (may be too time-consuming at the moment - work on it gradually)

- [ ] Scope Checking
