import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewsLetter() {
  return (
    <div className="bg-[#f2f3f5] mt-16">
      <div className="max-w-7xl py-20 mx-auto px-3">
        <div className="flex justify-center">
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-xl font-bold">Sign Up For Newsletter</h1>
              <p className="text-gray-500 mt-2">
                Join 60.000+ Subscribers and get a update new
                <br /> discountable Product.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Your Email Address" />
                <Button className="bg-themeColor" type="submit">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
