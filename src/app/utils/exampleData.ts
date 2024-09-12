import { Recipe } from "./types";

// sample data generated from chatGPT
export const recipes: Recipe[] = [
    {
        id: 1,
        name: "Spaghetti Carbonara",
        ingredients: [
            {
                ingredient: {
                    name: "Spaghetti",
                    unit: "g"
                },
                amount: 200
            },
            {
                ingredient: {
                    name: "Pancetta",
                    unit: "g"
                },
                amount: 100
            },
            {
                ingredient: {
                    name: "Parmesan Cheese",
                    unit: "g"
                },
                amount: 50
            },
            {
                ingredient: {
                    name: "Eggs",
                    unit: "pieces"
                },
                amount: 3
            },
            {
                ingredient: {
                    name: "Black Pepper",
                    unit: "ts"
                },
                amount: 1
            }
        ],
        description: [
            {
                text: "Cook the spaghetti in salted boiling water until al dente.",
                imageUrl: "none"
            },
            {
                text: "Fry the pancetta until crispy.",
                imageUrl: "none"
            },
            {
                text: "Whisk the eggs and Parmesan together in a bowl.",
                imageUrl: "none"
            },
            {
                text: "Drain the spaghetti and mix with the pancetta.",
                imageUrl: "none"
            },
            {
                text: "Remove from heat and stir in the egg and cheese mixture. Season with black pepper.",
                imageUrl: "none"
            }
        ],
        thumbnailUrl: "",
        durcation:20
    },
    {
        id: 2,
        name: "Margherita Pizza",
        ingredients: [
            {
                ingredient: {
                    name: "Pizza Dough",
                    unit: "piece"
                },
                amount: 1
            },
            {
                ingredient: {
                    name: "Tomato Sauce",
                    unit: "g"
                },
                amount: 100
            },
            {
                ingredient: {
                    name: "Mozzarella Cheese",
                    unit: "g"
                },
                amount: 150
            },
            {
                ingredient: {
                    name: "Fresh Basil",
                    unit: "leaves"
                },
                amount: 10
            },
            {
                ingredient: {
                    name: "Olive Oil",
                    unit: "ts"
                },
                amount: 1
            }
        ],
        description: [
            {
                text: "Preheat the oven to 250°C (480°F).",
                imageUrl: "https://example.com/images/step1_pizza.jpg"
            },
            {
                text: "Spread the tomato sauce evenly over the pizza dough.",
                imageUrl: "https://example.com/images/step2_pizza.jpg"
            },
            {
                text: "Scatter the mozzarella cheese on top.",
                imageUrl: "https://example.com/images/step3_pizza.jpg"
            },
            {
                text: "Bake in the preheated oven for 10-12 minutes until the crust is golden and the cheese is bubbly.",
                imageUrl: "https://example.com/images/step4_pizza.jpg"
            },
            {
                text: "Remove from the oven and top with fresh basil leaves and a drizzle of olive oil.",
                imageUrl: "https://example.com/images/step5_pizza.jpg"
            }
        ],
        thumbnailUrl: "",
        durcation:20
    },
    {
        id: 3,
        name: "Chicken Curry",
        ingredients: [
            {
                ingredient: {
                    name: "Chicken Breast",
                    unit: "g"
                },
                amount: 500
            },
            {
                ingredient: {
                    name: "Coconut Milk",
                    unit: "ml"
                },
                amount: 400
            },
            {
                ingredient: {
                    name: "Curry Paste",
                    unit: "tablespoons"
                },
                amount: 3
            },
            {
                ingredient: {
                    name: "Onion",
                    unit: "pieces"
                },
                amount: 1
            },
            {
                ingredient: {
                    name: "Garlic",
                    unit: "cloves"
                },
                amount: 3
            },
            {
                ingredient: {
                    name: "Ginger",
                    unit: "g"
                },
                amount: 20
            },
            {
                ingredient: {
                    name: "Coriander",
                    unit: "g"
                },
                amount: 5
            }
        ],
        description: [
            {
                text: "Chop the onion, garlic, and ginger finely.",
                imageUrl: "https://example.com/images/step1_curry.jpg"
            },
            {
                text: "Fry the chopped ingredients in a pan until softened.",
                imageUrl: "https://example.com/images/step2_curry.jpg"
            },
            {
                text: "Add the curry paste and cook for a few minutes until fragrant.",
                imageUrl: "https://example.com/images/step3_curry.jpg"
            },
            {
                text: "Add the chicken and cook until browned.",
                imageUrl: "https://example.com/images/step4_curry.jpg"
            },
            {
                text: "Pour in the coconut milk and simmer for 20 minutes.",
                imageUrl: "https://example.com/images/step5_curry.jpg"
            },
            {
                text: "Garnish with fresh coriander and serve hot.",
                imageUrl: "https://example.com/images/step6_curry.jpg"
            }
        ],
        thumbnailUrl: "",
        durcation:20
    },
    {
        id: 4,
        name: "Chocolate Cake",
        ingredients: [
            {
                ingredient: {
                    name: "Flour",
                    unit: "g"
                },
                amount: 200
            },
            {
                ingredient: {
                    name: "Sugar",
                    unit: "g"
                },
                amount: 150
            },
            {
                ingredient: {
                    name: "Cocoa Powder",
                    unit: "g"
                },
                amount: 50
            },
            {
                ingredient: {
                    name: "Baking Powder",
                    unit: "ts"
                },
                amount: 2
            },
            {
                ingredient: {
                    name: "Eggs",
                    unit: "pieces"
                },
                amount: 2
            },
            {
                ingredient: {
                    name: "Butter",
                    unit: "g"
                },
                amount: 100
            },
            {
                ingredient: {
                    name: "Milk",
                    unit: "ml"
                },
                amount: 200
            }
        ],
        description: [
            {
                text: "Preheat the oven to 180°C (350°F).",
                imageUrl: "https://example.com/images/step1_cake.jpg"
            },
            {
                text: "Mix the flour, sugar, cocoa powder, and baking powder in a bowl.",
                imageUrl: "https://example.com/images/step2_cake.jpg"
            },
            {
                text: "Add the eggs, melted butter, and milk, and mix until smooth.",
                imageUrl: "https://example.com/images/step3_cake.jpg"
            },
            {
                text: "Pour the batter into a greased cake tin.",
                imageUrl: "https://example.com/images/step4_cake.jpg"
            },
            {
                text: "Bake for 25-30 minutes, or until a skewer comes out clean.",
                imageUrl: "https://example.com/images/step5_cake.jpg"
            },
            {
                text: "Let the cake cool before removing it from the tin.",
                imageUrl: "https://example.com/images/step6_cake.jpg"
            }
        ],
        thumbnailUrl: "",
        durcation:20
    },
    {
        id: 5,
        name: "Caesar Salad",
        ingredients: [
            {
                ingredient: {
                    name: "Romaine Lettuce",
                    unit: "g"
                },
                amount: 200
            },
            {
                ingredient: {
                    name: "Chicken Breast",
                    unit: "g"
                },
                amount: 150
            },
            {
                ingredient: {
                    name: "Croutons",
                    unit: "g"
                },
                amount: 50
            },
            {
                ingredient: {
                    name: "Parmesan Cheese",
                    unit: "g"
                },
                amount: 30
            },
            {
                ingredient: {
                    name: "Caesar Dressing",
                    unit: "tablespoons"
                },
                amount: 3
            }
        ],
        description: [
            {
                text: "Grill the chicken breast until fully cooked, then slice it.",
                imageUrl: "https://example.com/images/step1_salad.jpg"
            },
            {
                text: "Wash and chop the romaine lettuce.",
                imageUrl: "https://example.com/images/step2_salad.jpg"
            },
            {
                text: "In a large bowl, combine the lettuce, croutons, and sliced chicken.",
                imageUrl: "https://example.com/images/step3_salad.jpg"
            },
            {
                text: "Drizzle with Caesar dressing and toss to coat.",
                imageUrl: "https://example.com/images/step4_salad.jpg"
            },
            {
                text: "Top with shaved Parmesan cheese and serve immediately.",
                imageUrl: "https://example.com/images/step5_salad.jpg"
            }
        ],
        thumbnailUrl: "",
        durcation:20
    }
];
