import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <div className="bg-[#f8fafc] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 pt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium text-gray-900 text-left py-4">
                  Can I switch plans later?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be prorated for the remainder of your billing cycle.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium text-gray-900 text-left py-4">
                  Do you offer a free trial?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  We offer a 14-day free trial for the Professional plan. No credit card is required to start your trial, and you can cancel anytime.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium text-gray-900 text-left py-4">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  We accept all major credit cards, including Visa, Mastercard, and American Express. For Enterprise plans, we also offer invoicing options.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium text-gray-900 text-left py-4">
                  Can I customize features for my specific needs?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  The Professional plan allows for some customization, while the Enterprise plan offers full customization options. Our team can work with you to ensure Moorcheh meets your specific requirements.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium text-gray-900 text-left py-4">
                  Do you offer discounts for non-profits or educational institutions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  Yes, we offer special pricing for qualified non-profit organizations, educational institutions, and research facilities. Please contact our sales team for more information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
} 