import { v4 as uuid4 } from 'uuid';
import { Form, Formik, Field } from 'formik';
import * as yup from 'yup';
import { useCreatePostMutation } from 'globalState/post';

export default function AddPost() {
  const [createPost, result] = useCreatePostMutation();

  return (
    <div className='flex-1 ring-1 ml-[1px]'>
      <div className='mb-4 text-sky-600'>Add Post</div>
      <Formik
        {...{
          initialValues: { title: '', content: '' },
          validationSchema: yup.object().shape({
            title: yup.string().required('Required'),
            content: yup.string().required('Required'),
          }),
          onSubmit: values => {
            createPost({ id: uuid4(), title: values.title, content: values.content });
          },
        }}>
        {({ errors, touched, isValid, dirty }) => (
          <Form className='mx-4'>
            <Field
              name='title'
              type='text'
              placeholder={touched.title && errors.title ? errors.title : 'Title'}
              className='w-full my-2 ring-2 ring-gray-300 rounded-sm px-2'
            />
            <Field
              name='content'
              as='textarea'
              placeholder={touched.content && errors.content ? errors.content : 'Content...'}
              className='w-full my-2 ring-2 ring-gray-300 rounded-sm px-2'
            />
            <button
              type='submit'
              disabled={!dirty || !isValid || result.isLoading}
              className='bg-blue-500 text-white rounded-md px-4 disabled:bg-blue-400 disabled:cursor-not-allowed'>
              {result.isLoading ? 'Submitting...' : 'Create Post'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
