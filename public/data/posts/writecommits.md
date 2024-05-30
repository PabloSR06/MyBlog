
Git is software for tracking changes in any set of files, where each commit means a change. For a better control of your changes, you need a better description. Let's see the best way to write. commits
 


Recently I've been curious about git, and how to write a good commit message. Since my previous commits were something like “change style” or “changes”, I wanted the best way to do it.

I’m sure there are a hundred different ways to write commits, at the end it’s a choice, or if you are working as a team it is better doing it all the same way.

Some of the characteristic are: 

- The length of an ideal commit should not be bigger than 50.
- Being efficient and coherent with the information.
- Some say that you have to capitalize the first word and write the rest all lowercase.


Example:
```
<type><comment>

DOCS: add readme
```

This is some types of commits:

- `TEST` – Including new tests or correcting previous.
- `FIX` – Fix a bug or performance improvements.
- `FEAT` – A new feature.
- `CHORE` - Update of dependencies.
- `REVERT` – Reverts a previous commit.
- `DOCS` – Changes in the documentation.
- `REFACTOR` – Refactoring code, renaming a variable…
- `REMOVE` - Deleting functions or assets.
- `WIP` - Work In Progress.
- `PERF` - Performance improvements.
- `MERGE` - Join two different branches.

<br>
With all these types, your commits will have enough information and anyone who sees it can easily understand the changes even if they are not related to the project. 
Knowing how to write good commits is a good start, the next step is document the project, and especially your code. 
