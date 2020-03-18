# Secfi Software Engineer Assignment

### Good to Know

- **The usage of hooks**: I chose to use React Hooks whenever possible. I think keeping components as functions as long as possible helps to prevent a bloated codebase. These days hooks can serve functional components well and provide them with state mechanisms. Of course, it's possible to promote the component to a Class component at any time. I have no strong preference for this and am happy to adapt to whatever the team prefers if necessary.

- **Project structure:** Since React doesn't have explicit guidelines, I like following community best practices. Taking into consideration the separation of container component and presentational components. Therefore, container components are responsible for taking care of the data, logic, and presentational components are just representing the data.
- **Testing**: Due to limited time, I did not cover the entire application with tests. I tried to keep it minimal, and I covered the presentational components with tests. However, I feel very comfortable writing tests in multiple technologies. This has been an integral part of my work for the past years.

### General Decisions

- The development process for this assignment took 5 hours in total.
- I chose to separate the layers to container component and small (not dumb anymore, but say with small responsibilities), to keep on single responsibilities.
- I chose to use Material-UI to short the work time, but to be honest, it was longer then I expected, and for me, it doesn't feel very clean. However, I feel very comfortable writing in CSS3, SCSS (Sass), including SCSS Modules and other methodologies like BEM.
- I personally like the self-explanatory code approach, and therefore avoid comments. However, I am happy to be flexible and, if required, add comments to my code in a working environment.
- I know that the design is not 100%, that's just due to the limited time (The background, cards, separation of "widgets" for example). I preferred to have a working product.
- I chose to follow the "feature/event" pattern of redux. see [https://redux.js.org/style-guide/style-guide/#model-actions-as-events-not-setters](here)

- The provided API (alphavantage) is very weird; when there are errors instead of throwing an error and returning 400/401/500 it returns 200. So the implementation on the frontend side might look a bit weird; also, the API returns some weird text objects instead of simple ones, so please be aware of :)

- I think in general, it would be effortless to switch providers since there is a good separation between "modules", reducers, and hooks (useConversion). I wanted to write a custom hook to be fancy and show some skills, and just because I personally like it.

- In general, I tried to keep the code as clean as I can with the given time :)

If you have any other questions regarding the assignment, please let me know!
