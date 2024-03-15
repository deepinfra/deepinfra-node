Naming Conventions
========
This document outlines conventions applied throughout the project to ensure consistency and readability.

Table of Contents
=================

   * [AI Models](#naming-conventions)
      * [Class Naming Conventions](#class-naming-conventions)
         * [Examples](#examples)
      * [File Naming Conventions](#file-naming-conventions)
         * [Examples](#examples-1)


## AI Models

### Class Naming Conventions

When naming classes, our goal is to be as descriptive as possible while maintaining readability and ease of understanding. Here's how we achieve this:

1. `PascalCase` is applied for all class names.
2. Version numbers are separated by underscores.
3. Name before slash is disregarded.

#### Examples

1. `Llava-hf/llava-1.5-7b-hf` -> `Llava_1_5_7B_Hf`
2. `Google/gemma-7b-it` -> `Gemma_7B_It`
3. `Mistralai/Mixtral-8x7B-Instruct-v0_1` -> `Mixtral_8x7B_Instruct_V0_1`
4. `Codellama/CodeLlama-70b-Instruct-hf` -> `CodeLlama_70B_Instruct_Hf`
5. `DeepInfra/airoboros-70b` -> `Airoboros_70B`

### File Naming Conventions

File names, while adhering to a similar principle of clarity and consistency, follow a slightly different rule set:

1. `kebab-case` is applied for all file names.
2. Version numbers are separated by underscores.
3. Name before slash is disregarded.

#### Examples

1. `Llava-hf/llava-1.5-7b-hf` -> `llava-7b-hf.ts`
2. `Google/gemma-7b-it` -> `gemma-7b-it.ts`
3. `Mistralai/Mixtral-8x7B-Instruct-v0_1` -> `mixtral-8x7b-instruct-v0_1.ts`
4. `Codellama/CodeLlama-70b-Instruct-hf` -> `codellama-70b-instruct-hf.ts`
5. `DeepInfra/airoboros-70b` -> `airoboros-70b.spec.ts`
