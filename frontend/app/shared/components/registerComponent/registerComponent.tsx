"use client";
import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { RegisterService } from "../../services/user.service";

type FieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const RegisterComponent = () => {
  const [form] = useForm<FieldType>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setIsSubmitting(true);
    form
      .validateFields()
      .then(() => {
        console.log("Validation success:", values);
        RegisterService({
          email: values.email ? values.email : "",
          password: values.password ? values.password : "",
        });
      })
      .catch((error) => {
        console.error("Validation error:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
    className="h-full w-full"
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please input your confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterComponent;
