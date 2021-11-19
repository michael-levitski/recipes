-- Recipes
DROP TABLE IF EXISTS recipes;
CREATE TABLE IF NOT EXISTS recipes(
   recipeName VARCHAR(255) NOT NULL PRIMARY KEY
  ,numSteps   INTEGER  NOT NULL
);
INSERT INTO recipes(recipeName,numSteps) VALUES ('scrambledEggs',5);
INSERT INTO recipes(recipeName,numSteps) VALUES ('garlicPasta',5);
INSERT INTO recipes(recipeName,numSteps) VALUES ('chai',4);

-- Ingredients
DROP TABLE IF EXISTS ingredients;
CREATE TABLE IF NOT EXISTS ingredients(
   ingredient VARCHAR(255) NOT NULL
  ,recipeName VARCHAR(255) NOT NULL
  ,CONSTRAINT ingredientsPk PRIMARY KEY(ingredient,recipeName)
  ,CONSTRAINT ingredientsRecipesFk FOREIGN KEY(recipeName)
    REFERENCES recipes(recipeName)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
INSERT INTO ingredients(ingredient,recipeName) VALUES ('1 tsp oil','scrambledEggs');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('2 eggs','scrambledEggs');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('salt','scrambledEggs');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('500mL water','garlicPasta');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('100g spaghetti','garlicPasta');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('25mL olive oil','garlicPasta');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('4 cloves garlic','garlicPasta');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('Salt','garlicPasta');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('400mL water','chai');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('100mL milk','chai');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('5g chai masala','chai');
INSERT INTO ingredients(ingredient,recipeName) VALUES ('2 tea bags or 20 g loose tea leaves','chai');

-- Instructions
DROP TABLE IF EXISTS instructions;
CREATE TABLE IF NOT EXISTS instructions(
   instruction VARCHAR(255) NOT NULL
  ,stepNumber  INTEGER  NOT NULL
  ,recipeName  VARCHAR(255) NOT NULL
  ,CONSTRAINT instructionsPk PRIMARY KEY(stepNumber,recipeName)
  ,CONSTRAINT instructionsRecipesFk FOREIGN KEY(recipeName)
    REFERENCES recipes(recipeName)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Beat eggs with salt',1,'scrambledEggs');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Heat oil in pan',2,'scrambledEggs');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Add eggs to pan when hot',3,'scrambledEggs');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Gather eggs into curds, remove when cooked',4,'scrambledEggs');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Salt to taste and enjoy',5,'scrambledEggs');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Heat garlic in olive oil',1,'garlicPasta');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Boil water in pot',2,'garlicPasta');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Add pasta to boiling water',3,'garlicPasta');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Remove pasta from water and mix with garlic olive oil',4,'garlicPasta');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Salt to taste and enjoy',5,'garlicPasta');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Heat water until 80 C',1,'chai');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Add milk, heat until 80 C',2,'chai');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Add tea leaves/tea bags, chai masala; mix and steep for 3-4 minutes',3,'chai');
INSERT INTO instructions(instruction,stepNumber,recipeName) VALUES ('Remove mixture from heat; strain and enjoy',4,'chai');
