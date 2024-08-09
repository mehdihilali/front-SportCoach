const questions = [
  { id: 1, text: "What is your age?", type: 'age' },
  { id: 2, text: "Select your gender", type: 'select', options: [
      { label: "Female", value: "female", image: require('../../assets/images/female.png') },
      { label: "Male", value: "male", image: require('../../assets/images/male.png') }
    ], 
    description: "Biological sex is a factor that affects your basal metabolic rate (BMR), which determines how many calories you burn in a day."
  },
  { id: 3, text: "What do you want to achieve?", type: 'multi-select', options: [
      { label: "Lose weight", value: "lose_weight" },
      { label: "Improve heart health", value: "improve_heart_health" },
      { label: "Get firm and toned", value: "get_firm_and_toned" },
      { label: "Relieve stress", value: "relieve_stress" }
    ],
    description: "Choose the goals you want to achieve through your fitness journey."
  },
  { id: 4, text: "What is your height?", type: 'height' },
  { id: 5, text: "What is your current weight?", type: 'weight' },
  { id: 6, text: "What is your target weight?", type: 'target-weight' }, // Moved target weight question here
  { id: 7, text: "Choose your current body type", type: 'select', options: [
      { label: "Regular", value: "regular", image: require('../../assets/bodyType/regular.png') },
      { label: "Pot belly", value: "pot_belly", image: require('../../assets/bodyType/potBelly.png') },
      { label: "Extra", value: "extra", image: require('../../assets/bodyType/extra.png') }
    ]
  },
  { id: 8, text: "Choose your target body type", type: 'select', options: [
      { label: "Lean", value: "lean", image: require('../../assets/bodyType/lean.png') },
      { label: "Athletic", value: "athletic", image: require('../../assets/bodyType/athletic.png') },
      { label: "Shredded", value: "shredded", image: require('../../assets/bodyType/shredded.png') }
    ]
  },
  { id: 9, text: "What is your activity level?", type: 'select', options: [
      { label: "Sedentary (Little or no exercise)", value: "sedentary", image: require('../../assets/connectivity/connectivity1.png')},
      { label: "Lightly active (1-2 days /week)", value: "lightly_active", image: require('../../assets/connectivity/connectivity2.png')},
      { label: "Moderately active (3-5 days /week)", value: "moderately_active", image: require('../../assets/connectivity/connectivity3.png')},
      { label: "Highly active (daily physical job)", value: "highly_active", image: require('../../assets/connectivity/connectivity4.png')}
    ]
  },
  { id: 10, text: "How long do you walk on a typical day?", type: 'select', options: [
    { label: "Less than 20 mins", value: "less_than_20_mins" },
    { label: "20-60 mins", value: "20_60_mins" },
    { label: "1-2 hours", value: "1_2_hours" },
    { label: "More than 2 hours", value: "more_than_2_hours" }
  ]
},
{ id: 11, text: "Do you have any serious back problems?", type: 'select', options: [
  { label: "Yes", value: "yes", image: require('../../assets/YesNo/no.png') },
  { label: "No", value: "no", image: require('../../assets/YesNo/yes.png') }
],
description: "If you have any back problems, please contact your physician before starting the SportCoach program."
},
{ id: 12, text: "Are you experiencing discomfort anywhere?", type: 'discomfort' }
];

export default questions;