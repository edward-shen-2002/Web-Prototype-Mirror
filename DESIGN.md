# Design

Rough ideas which relate to the business and applcation designs

## Busienss

[Data Model and Workflow](https://docs.google.com/document/d/1-tmjMIJIab0onpwGjmIoOW-s6qjglvuxc0ol9j6IIhA/edit#)

## Application

[Application Systems Design](https://docs.google.com/document/d/1iaMfZ752PDWEc60gQwoSicoBnAeUp9JJthdUUom3vWM/edit)

In the previous design, the application had a dependency on a class to load the React components with related Excel data. However, the data structure of the class and JS/React syntax were different. This required data to be transformed every render. The transformation is expensive, which results in lagg and stuttering.

For the current design, it removed the dependency on that class. The data structure is also the same as JS/React (ie inline styles) which removed the translation/calculations. As a result, the application performs much faster. However, functionalities of the class are no longer available and have to be re-implemented.
