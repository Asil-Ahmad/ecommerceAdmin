import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, Typography, Input, Textarea, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const AboutFeatures = () => {
  const [data, setData] = useState({
    text1: "",
    text2: "",
    image1: "",
    image2: "",
    text2Content: "",
    paraTitle1: "",
    paraContent1: "",
    paraTitle2: "",
    paraContent2: "",
    paraTitle3: "",
    paraContent3: "",
    paraTitle4: "",
    paraContent4: "",
  });
  const fetchAboutFeature = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/aboutFeaturePage/get-aboutFeature"
      );

      setData(response.data);
    } catch (error) {
      console.log("Error fetching About data", error);
    }
  };

  const updateAboutFeature = async (id) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("text1", data.text1);
      formData.append("text2", data.text2);
      formData.append("image1", data.image1);
      formData.append("image2", data.image2);
      formData.append("text2Content", data.text2Content);
      formData.append("paraTitle1", data.paraTitle1);
      formData.append("paraContent1", data.paraContent1);
      formData.append("paraTitle2", data.paraTitle2);
      formData.append("paraContent2", data.paraContent2);
      formData.append("paraTitle3", data.paraTitle3);
      formData.append("paraContent3", data.paraContent3);
      formData.append("paraTitle4", data.paraTitle4);
      formData.append("paraContent4", data.paraContent4);

      const response = await axios.post(
        "http://localhost:4000/api/aboutFeaturePage/update-aboutFeature",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("About Data Updated", response.data);
      toast.success("About Features Updated");
      fetchAboutFeature();
    } catch (error) {
      console.log("Error updating About data", error);
    }
  };

  useEffect(() => {
    fetchAboutFeature();
  }, []);
  return (
    <section className='container scale-95'>
      <div >
        {/* todo Section #1 */}
        <div className='flex items-center gap-10   '>
          <div className='w-1/2'>
            <img
              src={typeof data.image1 === "string" ? data.image1 : URL.createObjectURL(data.image1)}
              alt=''
              className='w-[572px] h-[500px] object-cover'
            />
          </div>

          <div className='py-10 w-1/2'>
            <h1 className='text-[38px] leading-[48px]'>{data?.text1}</h1>
            <div className='flex flex-col gap-5 py-5 font-poppins'>
              <div>
                <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                  {data?.paraTitle1}
                </h2>
                <p className='text-[20px] leading-[1.4em]'>{data?.paraContent1}</p>
              </div>

              <div>
                <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                  {data?.paraTitle2}
                </h2>
                <p className='text-[20px] leading-[1.4em]'>{data?.paraContent2}</p>
              </div>

              <div>
                <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                  {data?.paraTitle3}
                </h2>
                <p className='text-[20px] leading-[1.4em]'>{data?.paraContent3}</p>
              </div>

              <div>
                <h2 className='text-[20px] leading-[1.4em] text-red-300 tracking-wider'>
                  {data?.paraTitle4}
                </h2>
                <p className='text-[20px] leading-[1.4em]'>{data?.paraContent4}</p>
              </div>
            </div>
          </div>
        </div>

        {/* todo Section #2 */}
        <div className='flex items-center justify-between '>
          <div className='w-[45.35%]'>
            <img
              src={typeof data.image2 === "string" ? data.image2 : URL.createObjectURL(data.image2)}
              alt=''
              className='w-[572px] h-[500px] object-cover'
            />
          </div>

          <div className='w-[51%] flex flex-col gap-6'>
            <h1 className='text-[38px] leading-[48px]'>{data?.text2}</h1>
            <p className='text-[20px] leading-[1.4em]'>{data?.text2Content}</p>
          </div>
        </div>

        <Card className='container mx-auto p-8 '>
          <CardBody className='p-6'>
            <Typography variant='h2' className='text-2xl font-bold mb-6'>
              Edit About Features Section
            </Typography>
            <form className='space-y-6 '>
              <Input
                label='Text 1'
                type='text'
                value={data.text1 || ""}
                onChange={(e) => setData({ ...data, text1: e.target.value })}
              />

              <Input
                label='Text 2'
                type='text'
                value={data.text2 || ""}
                onChange={(e) => setData({ ...data, text2: e.target.value })}
              />

              <Textarea
                label='Text 2 Content'
                value={data.text2Content || ""}
                onChange={(e) => setData({ ...data, text2Content: e.target.value })}
                rows={3}
              />

              <div className='grid grid-cols-2 gap-4'>
                <Input
                  label='Paragraph Title 1'
                  type='text'
                  value={data.paraTitle1 || ""}
                  onChange={(e) => setData({ ...data, paraTitle1: e.target.value })}
                />
                <Textarea
                  label='Paragraph Content 1'
                  value={data.paraContent1 || ""}
                  onChange={(e) => setData({ ...data, paraContent1: e.target.value })}
                  rows={3}
                />
                <Input
                  label='Paragraph Title 2'
                  type='text'
                  value={data.paraTitle2 || ""}
                  onChange={(e) => setData({ ...data, paraTitle2: e.target.value })}
                />
                <Textarea
                  label='Paragraph Content 2'
                  value={data.paraContent2 || ""}
                  onChange={(e) => setData({ ...data, paraContent2: e.target.value })}
                  rows={3}
                />
                <Input
                  label='Paragraph Title 3'
                  type='text'
                  value={data.paraTitle3 || ""}
                  onChange={(e) => setData({ ...data, paraTitle3: e.target.value })}
                />
                <Textarea
                  label='Paragraph Content 3'
                  value={data.paraContent3 || ""}
                  onChange={(e) => setData({ ...data, paraContent3: e.target.value })}
                  rows={3}
                />
                <Input
                  label='Paragraph Title 4'
                  type='text'
                  value={data.paraTitle4 || ""}
                  onChange={(e) => setData({ ...data, paraTitle4: e.target.value })}
                />
                <Textarea
                  label='Paragraph Content 4'
                  value={data.paraContent4 || ""}
                  onChange={(e) => setData({ ...data, paraContent4: e.target.value })}
                  rows={3}
                />
              </div>

              <div className='flex gap-5'>
                <div className='max-w-40 border-dashed border-2 border-gray-400 p-4 rounded-md'>
                  <label htmlFor='image1' className='flex flex-col gap-3'>
                    <div className='flex gap-4'>
                      {data.image1 && (
                        <img
                          src={
                            typeof data.image1 === "string"
                              ? data.image1
                              : URL.createObjectURL(data.image1)
                          }
                          alt='Image 1'
                          className='w-[150px] h-[70px] object-contain'
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type='file'
                    label='Image 1'
                    id='image1'
                    accept='image/*'
                    hidden
                    onChange={(e) => setData({ ...data, image1: e.target.files[0] })}
                  />
                </div>

                <div className='max-w-40 border-dashed border-2 border-gray-400 p-4 rounded-md'>
                  <label htmlFor='image2' className='flex flex-col gap-3'>
                    <div className='flex gap-4'>
                      {data.image2 && (
                        <img
                          src={
                            typeof data.image2 === "string"
                              ? data.image2
                              : URL.createObjectURL(data.image2)
                          }
                          alt='Image 2'
                          className='w-[150px] h-[70px] object-contain'
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type='file'
                    label='Image 2'
                    id='image2'
                    accept='image/*'
                    hidden
                    onChange={(e) => setData({ ...data, image2: e.target.files[0] })}
                  />
                </div>
              </div>

              <Button type='button' className='w-full' onClick={() => updateAboutFeature(data._id)}>
                Save Changes
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default AboutFeatures;
