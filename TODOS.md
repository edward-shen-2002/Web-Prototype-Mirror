# TODOS

## Prioritized

- [ ] Excel history - redo/undo
- [ ] Excel sheet mouse auto-scroll
- [ ] Package creation
- [ ] Workflow features (editor, reviewer, approver)
- [ ] Convert excel editor state to Xlsx-populate rich text
- [ ] Excel formulas
- [ ] Excel styles
- [ ] Prevent application from mounting until user data is fetched

## Unprioritized

- [ ] Token blacklist
- [ ] Webpack hostname - route production build with public URL (CRA can do it)
- [ ] Pagination
- [ ] Miscellaneous information - ie: job positions
- [ ] General and route error handlers- should everything be handled here or do it in the original route? (General error handler handles most errors but may not make sense for some routes)
- [ ] Strengthen verfication ids (change MongoDB Id to a more secure Id -- MongoDB Id is too predicatable)
- [ ] Keep styles considtent (ie, Profile and All packages headers/pages - mismatched styles)
- [ ] It's possible that an admin updates his/her own roles - refetch data in that case (very unlikely case)
- [ ] Modifying one hierarchy may affect other hierarchies -- update affected hierarchies (ie remove user from organization => remove organization in user)

## Important but Unprioritized (may be too time-consuming at the moment - work on it gradually)

- [ ] Scope Checking

## Finished

- [x] Resize excel headers
- [x] Compress inactive sheets
- [x] Excel multiple selection
