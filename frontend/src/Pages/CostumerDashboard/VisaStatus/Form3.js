import React,{useState,useEffect} from 'react'
import axios from 'axios';
const Form3 = () => {
  const [formData, setFormData] = useState({
    documents:[]
  });
  const handleDocumentNameChange = (index, event) => {
    const newDocuments = [...formData.documents];
    newDocuments[index].name = event.target.value;
    setFormData({ ...formData, documents: newDocuments });
  };

  const handleFileChange = (index, event) => {
    const newDocuments = [...formData.documents];
    newDocuments[index].file = event.target.files[0];
    setFormData({ ...formData, documents: newDocuments });
  };

  const handleAddDocument = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, { name: "", file: null }],
    });
  };

  const handleRemoveDocument = (index) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    setFormData({ ...formData, documents: newDocuments });
  };
    const fetchDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee/get/visaDocumentName`);
      
      if (response.data.message.length > 0) {
        const documentNames = response.data.message.map(doc => doc.documentName); // Get all document names
        setFormData(prevState => ({
          ...prevState,
          documents: documentNames.map(name => ({ name, file: null })) // Initialize documents 
        }));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div >
      <div className='mx-auto mb-3 shadow px-5 py-3 rounded' style={{width:"1000px"}}>
            <div className="visaApplication-form-group-doc">
              <div className="document-add-btns">
                <h5 className="visaApplication-label">Documents:</h5>
                <button
                  type="button"
                  className="btn btn-danger add-dcoument-danger"
                  onClick={handleAddDocument}
                >
                  Add Document
                </button>
              </div>
              <div className="table-responsive">
                <table className="table my-2 table-bordered border-Dark text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Document Name</th>
                      <th>Upload</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.documents.map((document, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="visaApplication-input  form-control"
                            placeholder="Document Name"
                            value={document.name}
                            onChange={(event) =>
                              handleDocumentNameChange(index, event)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            className="visaApplication-input  form-control"
                            onChange={(event) => handleFileChange(index, event)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => handleRemoveDocument(index)}
                            style={{background:"#e12912",color:'white'}}
                          >
                            -
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="submit" className="btn btn-danger-submit" style={{background:"#e12912",color:'white'}}>
            Submit
          </button>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Form3
