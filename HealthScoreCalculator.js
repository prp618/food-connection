const PERCENT_CARBS         = .55;
const PERCENT_PROTEIN       = .15;
const PERCENT_FAT           = .30;
const ADDED_SUGAR_PENALTY   = 20;
const FIBER_BONUS_PER_GRAM  = 2;
const CALORIES_PER_GRAM_F   = 9;
const CALORIES_PER_GRAM_P   = 4;
const CALORIES_PER_GRAM_C   = 4;
const CARB_MAX_POINTS       = PERCENT_CARBS * 100;
const FAT_MAX_POINTS        = PERCENT_FAT * 100;
const PROTEIN_MAX_POINTS    = PERCENT_PROTEIN * 100;
const OVEREATING_PENALTY    = 3;

export default class HealthScoreCalculator {
    static createDiet(user) {
        const currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);
        const diet = {
            total: 0,
            fat: 0,
            protein: 0,
            carbohydrates: 0,
            lastCalculated: currentDay,
        };
        const age = user.age;
        const physicalActivityCoefficient = 1.0;
        switch (user.activityLevel) {
            case "sedentary":
                physicalActivityCoefficient = 1.0;
                break;
            case "low":
                physicalActivityCoefficient = 1.12;
                break;
            case "medium":
                physicalActivityCoefficient = 1.27;
                break;
            case "high":
                physicalActivityCoefficient = 1.45;
                break;
        }
        const weight = user.weight * 0.4535924; /* Pounds to kilos */
        const height = user.height * 0.0254; /* Inches to meters */
        diet.total = Math.round(354.1 - (6.91 * age) + physicalActivityCoefficient * (9.36 * weight + 726 * height));
        diet.carbohydrates = Math.round(diet.total * PERCENT_CARBS);
        diet.protein = Math.round(diet.total * PERCENT_PROTEIN);
        diet.fat = Math.round(diet.total * PERCENT_FAT);
        return diet;
    }

    static setHealthScore(foods, diet) {
        foods.forEach((food) => {
            food.healthScore = 0;

            if (food.addedSugar) {
                food.healthScore -= ADDED_SUGAR_PENALTY;
            }

            food.healthScore += food.fiber * FIBER_BONUS_PER_GRAM;

            const projectedCalories = diet.total / food.calories;
            const carbRatio = (food.carbs * CALORIES_PER_GRAM_C * projectedCalories) / diet.carbohydrates;
            const proteinRatio = (food.protein * CALORIES_PER_GRAM_P * projectedCalories) / diet.protein;
            const fatRatio = (food.fat * CALORIES_PER_GRAM_F * projectedCalories) / diet.fat;

            const carbDistance = 1 - carbRatio;
            const proteinDistance = 1 - proteinRatio;
            const fatDistance = 1 - fatRatio;

            const caloriesOver = food.calories - diet.total;
            if (caloriesOver > 0) {
                food.healthScore -= (caloriesOver / 10) * OVEREATING_PENALTY;
            }

            if (carbDistance > 0) {
                food.healthScore += carbRatio * CARB_MAX_POINTS;
            }
            if (proteinDistance > 0) {
                food.healthScore += proteinRatio * PROTEIN_MAX_POINTS;
            }
            if (fatDistance > 0) {
                food.healthScore += fatRatio * FAT_MAX_POINTS;
            }

            if (food.healthScore < 0) {
                food.healthScore = 0;
            }
            if (food.healthScore > 100) {
                food.healthScore = 100;
            }
            food.healthScore = Math.round(food.healthScore);
        });

        foods.sort((a, b) => {
            return b.healthScore - a.healthScore;
        });
        return foods;
    }
}