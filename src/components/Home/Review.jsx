import reviewerOne from "../../assets/reviewerOne.webp";
import reviewerTwo from "../../assets/reviewerTwo.webp";
import reviewerThree from "../../assets/reviewerThree.jpg";

export default function Review() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center">
          <h3 className="text-2xl font-medium">Our Trusted Customer Reviews</h3>
          <div className="flex justify-center mt-2">
            <div className="border-b-2 border-themeColor w-44"></div>
          </div>
        </div>
        <section className="text-gray-600 body-font pt-10">
          <div className="">
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                <div className="h-full text-center">
                  <img
                    alt="testimonial"
                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src={reviewerTwo}
                  />
                  <p className="leading-relaxed">
                    Medicine Mart is the best one. Staffs are so supportive and
                    behaved. Medicine price is genuine. Thanks
                  </p>
                  <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
                  <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                    Ramim Ahmed
                  </h2>
                  <p className="text-gray-500">Banladesh</p>
                </div>
              </div>
              <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                <div className="h-full text-center">
                  <img
                    alt="testimonial"
                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src={reviewerOne}
                  />
                  <p className="leading-relaxed">
                    I love to order medicine in Medilazar. Because I am
                    impressed with your shop consultant, friendly services, and
                    genuine medicines.
                  </p>
                  <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
                  <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                    Masuma Riya
                  </h2>
                  <p className="text-gray-500">Bangladesh</p>
                </div>
              </div>
              <div className="lg:w-1/3 lg:mb-0 p-4">
                <div className="h-full text-center">
                  <img
                    alt="testimonial"
                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src={reviewerThree}
                  />
                  <p className="leading-relaxed">
                    I bought medicine at Medilazar shop a lot. Products are so
                    good. The price is a bit high because of high-quality
                    medicines. No Problem.
                  </p>
                  <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
                  <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                    Adnan Ahmed
                  </h2>
                  <p className="text-gray-500">Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
