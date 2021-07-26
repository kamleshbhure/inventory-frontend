import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup'

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    brand: Yup.string().required('Required'),
    madein: Yup.string().required('Required'),
    price: Yup.number('Invalid Number format').required('Required')
  })
function ProductForm(props) {
  const handleSubmit = (values, submitProps) => {
      props.handleSubmit(values);
  }
  const initialValues = props.product || {name: '', brand: '', madein: '', price: '', status: 'Active'};
    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
            >
            {formik => {
                return (
                    <Form >
                    <Modal.Body>
                        <div className="form-floating mb-3">
                            <Field type='text' id='name' name='name' 
                                className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                            />
                            <label htmlFor="name">Name</label>
                            <ErrorMessage name='name'>
                                {error => <div className='invalid-feedback'>{error}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="form-floating mb-3">
                            <Field type='text' id='brand' name='brand' 
                                className={`form-control ${formik.touched.brand && formik.errors.brand ? "is-invalid" : ""}`}/>
                            <label htmlFor="brand">Brand</label>
                            <ErrorMessage name='brand'>
                                {error => <div className='invalid-feedback' style={{display: "block"}}>{error}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="form-floating mb-3">
                            <Field type='text' id='madein' name='madein' 
                                className={`form-control ${formik.touched.madein && formik.errors.madein ? "is-invalid" : ""}`}/>
                            <label htmlFor="madein">Made in</label>
                            <ErrorMessage name='madein'>
                                {error => <div className='invalid-feedback' style={{display: "block"}}>{error}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="form-floating mb-3">
                            <Field type='number' id='price' name='price' 
                                className={`form-control ${formik.touched.price && formik.errors.price ? "is-invalid" : ""}`}/>
                            <label htmlFor="price">Price</label>
                            <ErrorMessage name='price'>
                                {error => <div className='invalid-feedback' style={{display: "block"}}>{error}</div>}
                            </ErrorMessage>
                        </div>
                        <Field type='hidden' id='status' name='status' value='Active' />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => props.onClose(e)}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                    </Form>
                )
            }
        }
        </Formik>
    );
}

export default ProductForm;