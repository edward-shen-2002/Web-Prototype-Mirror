# Business Workflow

## Workflow

* Admin creates package; assigns reviewers/approvers, organizations, ...
* Organization Package gets created with copied workflow parameters from package
* Manager assigns editors, which is recorded to Organization Package
* Editors can edit Organization Package within the editting period
* After the edit period comes the reviewing period
* ...

## Design Decisions

* The managers assign editors because they are more familiar with the employees in the organization
* Organization Package is for submission and workflow records
* ...

## Issues

* How does organization cluster admin (LHIN) work? Should admin roles be different from those roles?
  * New role scope would be something like: user manager - one of [ admin, LHIN, organization ]
  * Possibly define a parameter called adminClass, which represents the level of admin capabilities that users can have... Front-end would need to change
  * Or roles can be of the form { ROLE_1 : scope (one of [ "N/A", "admin", "lhin", "manager", organization ]) }. The given sample scope may not apply to all roles
