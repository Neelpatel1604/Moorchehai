export function ValuesSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Our Values</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What We Stand For
          </p>
        </div>
        
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <ValueItem
              iconPath="M13 10V3L4 14h7v7l9-11h-7z"
              title="Efficiency"
              description="We believe in making the most of limited resources, creating AI solutions that are both powerful and efficient."
            />
            
            <ValueItem
              iconPath="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              title="Privacy"
              description="We're committed to data privacy and security, ensuring that sensitive information stays where it belongs."
            />
            
            <ValueItem
              iconPath="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              title="Transparency"
              description="We believe in transparent AI, where users understand how decisions are made and have control over the process."
            />
            
            <ValueItem
              iconPath="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              title="Collaboration"
              description="We work closely with our customers to understand their unique challenges and create tailored solutions."
            />
          </dl>
        </div>
      </div>
    </div>
  );
}

interface ValueItemProps {
  iconPath: string;
  title: string;
  description: string;
}

function ValueItem({ iconPath, title, description }: ValueItemProps) {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#1e40af] text-white">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">
        {description}
      </dd>
    </div>
  );
} 