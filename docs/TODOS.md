# TODOS

## Prioritized

- Excel sheet mouse auto-scroll
- Adjust z-index of cells when value is present
- Convert excel editor state to Xlsx-populate rich text
- Excel formulas
- Excel styles
- Menu for sheet navigations
- Hyperlinks
- Edit cell level change (on the same level as sheet instead of child of sheet)
- Import ID
- Download Excel file
- User settings
- Phase deadlines
- Report
- Excel history - change direct reference modification
- Excel history - set initial index (when excel is fully loaded)
- Excel history - make mouse actions specific (not mouse up/mouse down.. too general)
- Excel history - Limit history scope - some actions are not included in history

## Unprioritized

- Token blacklist
- Responsiveness
- Pagination
- Miscellaneous information - ie: job positions
- General and route error handlers- should everything be handled here or do it in the original route? (General error handler handles most errors but may not make sense for some routes)
- Strengthen verfication ids (change MongoDB Id to a more secure Id -- MongoDB Id is too predicatable)
- Keep styles consistent (ie, Profile and All packages headers/pages - mismatched styles)
- It's possible that an admin updates his/her own roles - refetch data in that case (very unlikely case)
- Modifying one hierarchy may affect other hierarchies -- update affected hierarchies (ie remove user from organization => remove organization in user)

## Important but Unprioritized (may be too time-consuming at the moment - work on it gradually)

- Scope Checking
