import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import axios from '../../api';

const { Option } = Select;

const CampaignScreen = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [voices, setVoices] = useState([]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/campaigns');
      setCampaigns(response.data);
    } catch (error) {
      message.error('Error fetching campaigns');
    } finally {
      setLoading(false);
    }
  };

  const fetchLanguagesAndVoices = async () => {
    try {
      const languageResponse = await axios.get('/languages/supported_languages');
      const voiceResponse = await axios.get('/languages/supported_voices');
      setLanguages(languageResponse.data.result.languages);
      setVoices(voiceResponse.data.result.voice);
    } catch (error) {
      message.error('Error fetching languages and voices');
    }
  };

  const handleCreate = async (values) => {
    if (typeof values.postCallAnalysisSchema !== 'object') {
      values.postCallAnalysisSchema = {};
    }
    const payload = {
      ...values,
      purpose: values.purpose || '',
      knowledgeBase: values.knowledgeBase || '',
      calendar: values.calendar || '',
      firstLine: values.firstLine || '',
      tone: values.tone || ''
    };
    setCreating(true);
    try {
      await axios.post('/campaigns/create', payload);
      message.success('Campaign created successfully');
      setModalVisible(false);
      fetchCampaigns();
    } catch (error) {
      message.error('Error creating campaign');
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (campaign) => {
    setCurrentCampaign(campaign);
    setUpdateModalVisible(true);
  };

  const handleUpdate = async (values) => {
    const payload = {
      ...values,
      id: currentCampaign.id,
    };
    setUpdating(true);
    try {
      await axios.post(`/campaigns/update`, payload);
      message.success('Campaign updated successfully');
      setUpdateModalVisible(false);
      fetchCampaigns();
    } catch (error) {
      message.error('Error updating campaign');
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchLanguagesAndVoices();
  }, []);

  return (
    <div className="bg-black border-8 border-black min-h-screen p-4 text-white">



<div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold">All Campaigns</h1>
  <div style={{ display: 'flex', gap: '20px' }}>
    <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setModalVisible(true)} style={{ backgroundColor: '#1E90FF', borderColor: '#1E90FF' }}>
      Create
    </Button>
    <Button type="primary" icon={<EditOutlined />} onClick={() => setUpdateModalVisible(true)} style={{ backgroundColor: '#32CD32', borderColor: '#32CD32' }}>
      Update
    </Button>
  </div>
</div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border border-gray-700 rounded relative">
                <h2 className="text-xl font-semibold">{campaign.name}</h2>
                <p>ID: {campaign.id}</p>
                <Button 
                  type="primary" 
                  icon={<EditOutlined />} 
                  onClick={() => handleEdit(campaign)} 
                  className="absolute top-2 right-2"
                >
                  Update
                </Button>
              </div>
            ))
          ) : (
            <p>No campaigns found.</p>
          )
        )}
      </div>

      <Modal
        title="Create Campaign"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'hidden' }}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '15px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <Form layout="vertical" onFinish={handleCreate} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="voice" label="Voice" rules={[{ required: true, message: 'Please select the voice' }]}>
              <Select>
                {voices.map((voice) => (
                  <Option key={voice.name} value={voice.name}>
                    {voice.name} {voice.type ? `(${voice.type})` : ''}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="language" label="Language" rules={[{ required: true, message: 'Please select the language' }]}>
              <Select>
                {languages.map((language) => (
                  <Option key={language} value={language}>
                    {language}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="script" label="Script" rules={[{ required: true, message: 'Please enter the script' }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="purpose" label="Purpose">
              <Input />
            </Form.Item>
            <Form.Item name="knowledgeBase" label="Knowledge Base">
              <Input />
            </Form.Item>
            <Form.Item name="calendar" label="Calendar">
              <Input />
            </Form.Item>
            <Form.Item name="firstLine" label="First Line">
              <Input />
            </Form.Item>
            <Form.Item name="tone" label="Tone">
              <Input />
            </Form.Item>
            <Form.Item name="postCallAnalysis" label="Post Call Analysis" rules={[{ required: true, message: 'Please specify post call analysis' }]}>
              <Select>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
            <Form.Item name="postCallAnalysisSchema" label="Post Call Analysis Schema">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={creating}>
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal
        title="Update Campaign"
        open={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        footer={null}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'hidden' }}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '15px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <Form layout="vertical" onFinish={handleUpdate} initialValues={currentCampaign} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Form.Item name="id" label="Campaign ID" rules={[{ required: true, message: 'Please enter the campaign ID' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
            <Form.Item name="voice" label="Voice">
              <Select>
                {voices.map((voice) => (
                  <Option key={voice.name} value={voice.name}>
                    {voice.name} {voice.type ? `(${voice.type})` : ''}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="language" label="Language">
              <Select>
                {languages.map((language) => (
                  <Option key={language} value={language}>
                    {language}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="script" label="Script">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="purpose" label="Purpose">
              <Input />
            </Form.Item>
            <Form.Item name="knowledgeBase" label="Knowledge Base">
              <Input />
            </Form.Item>
            <Form.Item name="calendar" label="Calendar">
              <Input />
            </Form.Item>
            <Form.Item name="firstLine" label="First Line">
              <Input />
            </Form.Item>
            <Form.Item name="tone" label="Tone">
              <Input />
            </Form.Item>
            <Form.Item name="postCallAnalysis" label="Post Call Analysis">
              <Select>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
            <Form.Item name="postCallAnalysisSchema" label="Post Call Analysis Schema">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={updating}>
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default CampaignScreen;
