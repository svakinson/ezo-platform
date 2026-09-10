// ============ პაკეტების ცენტრალიზებული კონფიგურაცია ============

export interface PlanFeature {
    text: string
    included: boolean
    highlight?: boolean // მნიშვნელოვანი ფუნქციების გამოსაყოფად
  }
  
  export interface PlanConfig {
    id: string
    name: string
    nameGe: string
    description: string
    price: number
    period: string
    maxBuildings: number
    maxApartments: number
    features: PlanFeature[]
    popular?: boolean
    cta: string
  }
  
  export const PLANS: PlanConfig[] = [
    {
      id: 'basic',
      name: 'Basic',
      nameGe: 'საბაზისო',
      description: 'პატარა კორპუსებისთვის და ახალი თავმჯდომარეებისთვის',
      price: 50,
      period: 'თვეში',
      maxBuildings: 1,
      maxApartments: 20,
      features: [
        { text: '1 კორპუსის მართვა', included: true },
        { text: 'მაქს. 20 ბინა', included: true },
        { text: 'ბინების დამატება/რედაქტირება/წაშლა', included: true },
        { text: 'მფლობელების მართვა', included: true },
        { text: 'თვიური საფასურის დადგენა', included: true },
        { text: 'გადახდების ხელით რეგისტრაცია', included: true },
        { text: 'ბალანსის ნახვა', included: true },
        { text: 'საბაზისო ფინანსური ანგარიში (PDF)', included: true },
        { text: 'განცხადებების გამოქვეყნება', included: true },
        { text: 'Email შეტყობინებები', included: true },
        { text: 'როლზე დაფუძნებული წვდომა', included: true },
        { text: 'SSL დაშიფვრა', included: true },
        { text: 'ონლაინ გადახდები (TBC/BoG)', included: false },
        { text: 'SMS შეტყობინებები', included: false },
        { text: 'შეკეთებების თრექინგი', included: false },
        { text: 'გამოკითხვები/ხმის მიცემა', included: false },
      ],
      cta: 'არჩევა',
    },
    {
      id: 'pro',
      name: 'Pro',
      nameGe: 'პროფესიონალი',
      description: 'საშუალო კორპუსებისთვის და პროფესიონალი მმართველებისთვის',
      price: 100,
      period: 'თვეში',
      maxBuildings: 3,
      maxApartments: 50,
      popular: true,
      features: [
        { text: '3 კორპუსის მართვა', included: true, highlight: true },
        { text: 'მაქს. 50 ბინა თითო კორპუსზე', included: true, highlight: true },
        { text: 'ყველა Basic ფუნქცია', included: true },
        { text: 'ბინების იმპორტი/ექსპორტი (CSV/Excel)', included: true },
        { text: 'მრავალმფლობელიანი ბინები', included: true },
        { text: 'ონლაინ გადახდები (TBC/BoG)', included: true, highlight: true },
        { text: 'ავტომატური ინვოისების გენერაცია', included: true, highlight: true },
        { text: 'დავალიანებების ავტომატური შეხსენებები', included: true },
        { text: 'SMS შეტყობინებები', included: true, highlight: true },
        { text: 'Push შეტყობინებები', included: true },
        { text: 'გამოკითხვები/ხმის მიცემა', included: true, highlight: true },
        { text: 'შეკეთებების მოთხოვნების სისტემა', included: true, highlight: true },
        { text: 'სტატუსების თრექინგი და ფოტოების ატვირთვა', included: true },
        { text: 'დოკუმენტების საცავი (1GB)', included: true },
        { text: 'გაფართოებული ფინანსური ანგარიშები', included: true },
        { text: 'ნაწილობრივი გადახდების მხარდაჭერა', included: true },
        { text: 'პრიორიტეტული მხარდაჭერა (24სთ)', included: true },
        { text: 'ბიუჯეტის დაგეგმვა', included: false },
        { text: 'API წვდომა', included: false },
        { text: 'თეთრი ეტიკეტი', included: false },
      ],
      cta: 'არჩევა',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      nameGe: 'საწარმო',
      description: 'დიდი კორპუსებისთვის და მრავალკორპუსიანი მმართველებისთვის',
      price: 200,
      period: 'თვეში',
      maxBuildings: 5,
      maxApartments: 100,
      features: [
        { text: '5 კორპუსის მართვა', included: true, highlight: true },
        { text: 'მაქს. 100 ბინა თითო კორპუსზე', included: true, highlight: true },
        { text: 'ყველა Pro ფუნქცია', included: true },
        { text: 'მრავალკორპუსიანი დაფა', included: true, highlight: true },
        { text: 'კორპუსებს შორის მონაცემების შედარება', included: true },
        { text: 'ცენტრალიზებული ანგარიშგება', included: true },
        { text: 'ავტომატური ბანკის რეკონცილიაცია', included: true, highlight: true },
        { text: 'ბიუჯეტის დაგეგმვა (წლიური/კვარტალური)', included: true, highlight: true },
        { text: 'წლიური ფინანსური ანგარიში', included: true },
        { text: 'ავტომატური SMS/Email კამპანიები', included: true },
        { text: 'სეგმენტირებული შეტყობინებები', included: true },
        { text: 'კონტრაქტორების მართვა და ხელშეკრულებები', included: true },
        { text: 'სრული აუდიტის ლოგი', included: true, highlight: true },
        { text: 'ორფაქტორიანი ავთენტიფიკაცია (2FA)', included: true },
        { text: 'API წვდომა (RESTful)', included: true, highlight: true },
        { text: 'თეთრი ეტიკეტი (White Label)', included: true, highlight: true },
        { text: 'მორგებული ინტეგრაციები და Webhook-ები', included: true },
        { text: 'პერსონალური მენეჯერი', included: true, highlight: true },
        { text: 'SLA გარანტია (99.9% uptime)', included: true },
        { text: '24/7 ტელეფონის მხარდაჭერა', included: true },
      ],
      cta: 'დაგვიკავშირდი',
    },
  ]
  
  // ============ Helper ფუნქციები ============
  export function getPlanById(id: string): PlanConfig | undefined {
    return PLANS.find(p => p.id === id)
  }