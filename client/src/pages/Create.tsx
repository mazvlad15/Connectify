import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import useAddPost from "../hooks/posts/useAddPost";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const addSchema = z.object({
  title: z.string().min(1, "Title must have at least 1 character"),
  description: z.string().min(1, "Description must have at least 1 character"),
});

type AddPostFormData = z.infer<typeof addSchema>;

const Create = () => {
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddPostFormData>({
    resolver: zodResolver(addSchema),
  });

  const { addPost, loading, error, message, setError } = useAddPost();

  const onSubmit = async (data: AddPostFormData) => {
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      await addPost({ ...data, image });
      reset(); 
      setImage(null); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [message, error]);

  return (
    <div className="ms-auto col-12 col-md-10 col-lg-10 d-flex tw-h-screen ">
      <Toaster />
      <div className="m-5 p-3 tw-w-full">
        <h1 className="tw-text-primary">Create a new post</h1>
        <h4 className="tw-text-secondary">
          Add an image, title, description and post it.
        </h4>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="gy-4">
            <Col xs={12}>
              <Form.Group controlId="description">
                <Form.Label className="tw-font-semibold tw-text-primary tw-text-xl">
                  Description
                </Form.Label>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    {...register("description")}
                    placeholder="Enter description"
                    isInvalid={!!errors.description}
                    style={{height: "250px"}}
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  {errors.description?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="title">
                <Form.Label className="tw-font-semibold tw-text-primary tw-text-xl">
                  Post title
                </Form.Label>
                <Form.Control
                  {...register("title")}
                  type="text"
                  placeholder="Enter title"
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="image">
                <Form.Label className="tw-font-semibold tw-text-primary tw-text-xl">
                  Image for post
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <button
                type="submit"
                className="tw-btn text-white hover:tw-bg-secondary tw-bg-primary w-100"
              >
                {loading ? "Posting..." : "Create Post"}
              </button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Create;
