import React, { useState, useEffect } from 'react';

const AboutPage3 = () => {
  const [aboutData, setAboutData] = useState({
    text1: "",
    text1Color: "",
    text2: "",
    text2Color: "",
    para: "",
    paraColor: "",
    buttonText: "",
    buttonTextColor: "",
    bgColor: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/aboutPage/get-aboutPage");
      const { aboutPage } = response.data;
      // console.log("About Data", aboutPage);
      setAboutData(aboutPage);
    } catch (error) {
      console.log("Error fetching About data", error);
    }
  };

  const updateAboutData = async (id) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("text1", aboutData.text1);
      formData.append("text1Color", aboutData.text1Color);
      formData.append("text2", aboutData.text2);
      formData.append("text2Color", aboutData.text2Color);
      formData.append("para", aboutData.para);
      formData.append("paraColor", aboutData.paraColor);
      formData.append("buttonText", aboutData.buttonText);
      formData.append("buttonTextColor", aboutData.buttonTextColor);
      formData.append("bgColor", aboutData.bgColor);

      if (aboutData.image && typeof aboutData.image !== "string") {
        formData.append("image", aboutData.image);
      }

      const response = await axios.post(
        "http://localhost:4000/api/aboutPage/update-aboutPage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("About Data Updated", response.data);

      fetchAboutData();
    } catch (error) {
      console.error("Error updating About data", error);
    } finally {
      setLoading(false);
      toast.success("About data updated successfully");
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);
  return (
    <section
      className=' text-gray-200'
      style={{
        background: `linear-gradient(to right, ${"#f03d3d"}, black)`,
      }}
    >
      {/* todo left section */}
      <div className='max-w-[1440px] flex justify-between m-auto'>
        <div className='container py-20 w-1/2 flex flex-col gap-5 '>
          <h1 className='text-[38px] leading-[48px] font-medium'>
            <span className='text-red-400'>Inventory Visibility</span> for <br /> seamless
            management
          </h1>
          <p className='text-[20px] leading-[1.4em]'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi aliquid voluptatem,
            cupiditate id quae beatae temporibus dolorum assumenda magni veritatis tempora odio
            eaque possimus quisquam magnam, suscipit ipsum laborum voluptas.
          </p>
          <p className='text-[20px] leading-[1.4em]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam corporis quo, est
            voluptatibus distinctio nemo?
          </p>

          <div className='mt-10 flex justify-between'>
            {/* left num */}
            <div className='flex items-center gap-5'>
              <img src='' alt='' className='w-12' />
              <div className='flex flex-col items-center'>
                <h1 className='text-5xl font-bold'>100%</h1>
                <p>Inventory Accuracy</p>
              </div>
            </div>
            {/* right num */}
            <div className='flex items-center gap-5'>
              <img src='' alt='' className='w-12' />
              <div className='flex flex-col items-center'>
                <h1 className='text-5xl font-bold'>100%</h1>
                <p className='text-lg  tracking-wider'>Inventory Accuracy</p>
              </div>
            </div>
          </div>
        </div>
        {/* todo right section */}
        <div className='w-1/2'>
          <img src='' alt='aboutPage3' />
        </div>
      </div>
    </section>
  );
};

export default AboutPage3;
