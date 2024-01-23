import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
interface TrackingStore {
  ProcessingType: string;
  setProcessingType: (value: string) => void;
  Location: string;
  setLocation: (value: string) => void;
  ToolUsed: string;
  setToolUsed: (value: string) => void;
  RecordedBy: string;
  setRecordedBy: (value: string) => void;
  Image: string;
  setImage: (value: string) => void;
  Comment: string;
  setComment: (value: string) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File) => void;
}

export const useTrackingStore = create(devtools<TrackingStore>((set) => ({
  ProcessingType: '',
  setProcessingType: (value) => set({ ProcessingType: value }),
  Location: '',
  setLocation: (value) => set({ Location: value }),
  ToolUsed: '',
  setToolUsed: (value) => set({ ToolUsed: value }),
  RecordedBy: '',
  setRecordedBy: (value) => set({ RecordedBy: value }),
  Image: '',
  setImage: (value) => set({ Image: value }),
  Comment: '',
  setComment: (value) => set({ Comment: value }),
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
})));

interface DeviceRegistrationStore {
  Name: string;
  setName: (value: string) => void;
  Serial: string;
  setSerial: (value: string) => void;
  Model: string;
  setModel: (value: string) => void;
  Type: string;
  setType: (value: string) => void;
  Manufacturer: string;
  setManufacturer: (value: string) => void;
  Specification: string;
  setSpecification: (value: string) => void;
}

export const useDeviceRegistrationStore = create(devtools<DeviceRegistrationStore>((set) => ({
    Name: '',
    setName: (value) => set({ Name: value }),
    Serial: '',
    setSerial: (value) => set({ Serial: value }),
    Model: '',
    setModel: (value) => set({ Model: value }),
    Type: '',
    setType: (value) => set({ Type: value }),
    Manufacturer: '',
    setManufacturer: (value) => set({ Manufacturer: value }),
    Specification: '',
    setSpecification: (value) => set({ Specification: value }),
  }))
);