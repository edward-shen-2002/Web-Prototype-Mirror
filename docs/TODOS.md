# TODOS

## Prioritized

- [ ] Excel history - redo/undo
- [ ] Excel sheet mouse auto-scroll
- [ ] Adjust z-index of cells when value is present
- [ ] Convert excel editor state to Xlsx-populate rich text
- [ ] Excel formulas
- [ ] Excel styles
- [ ] Add Excel type (template, edit, review, approve, ...) state to Redux store

## Unprioritized

- [ ] Token blacklist
- [ ] Webpack hostname - route production build with public URL (CRA can do it)
- [ ] Pagination
- [ ] Miscellaneous information - ie: job positions
- [ ] General and route error handlers- should everything be handled here or do it in the original route? (General error handler handles most errors but may not make sense for some routes)
- [ ] Strengthen verfication ids (change MongoDB Id to a more secure Id -- MongoDB Id is too predicatable)
- [ ] Keep styles consistent (ie, Profile and All packages headers/pages - mismatched styles)
- [ ] It's possible that an admin updates his/her own roles - refetch data in that case (very unlikely case)
- [ ] Modifying one hierarchy may affect other hierarchies -- update affected hierarchies (ie remove user from organization => remove organization in user)

## Important but Unprioritized (may be too time-consuming at the moment - work on it gradually)

- [ ] Scope Checking

## Finished

- [x] Resize excel headers
- [x] Compress inactive sheets
- [x] Excel multiple selection
- [x] Prevent application from mounting until user data is fetched
- [x] Package creation
- [x] Workflow features (editor, reviewer, approver)