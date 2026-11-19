import { Project, Snippet, CodingChallenge, BuildArtifact } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Smart IoT ESP32 Weather Station',
    description: 'Reads DHT22 sensor data, connects to WiFi, and uploads telemetry to cloud MQTT broker.',
    template: 'esp32',
    updatedAt: '2026-11-18 14:30',
    starred: true,
    files: [
      {
        id: 'f1',
        name: 'main.ino',
        language: 'cpp',
        content: `#include <WiFi.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "CodeSphere_Lab_5G";
const char* password = "secure_password_2026";

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi connected!");
}

void loop() {
  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  Serial.printf("Humidity: %.1f %% Temperature: %.1f *C\\n", h, t);
}`,
      },
      {
        id: 'f2',
        name: 'partitions.csv',
        language: 'csv',
        content: `# Name,   Type, SubType, Offset,  Size, Flags
nvs,      data, nvs,     0x9000,  0x4000,
otadata,  data, ota,     0xd000,  0x2000,
app0,     app,  ota_0,   0x10000, 0x140000,
app1,     app,  ota_1,   0x150000,0x140000,
spiffs,   data, spiffs,  0x290000,0x170000`,
      },
    ],
  },
  {
    id: 'proj-2',
    name: 'Neural Network Regression in Python',
    description: 'Custom NumPy feedforward neural network trained on synthetic housing price dataset.',
    template: 'python',
    updatedAt: '2026-11-17 19:15',
    starred: true,
    files: [
      {
        id: 'f3',
        name: 'model.py',
        language: 'python',
        content: `import numpy as np

class SimpleNeuralNet:
    def __init__(self, input_dim):
        np.random.seed(42)
        self.W = np.random.randn(input_dim, 1) * 0.01
        self.b = np.zeros((1, 1))

    def forward(self, X):
        return np.dot(X, self.W) + self.b

    def train(self, X, y, lr=0.01, epochs=100):
        m = X.shape[0]
        for epoch in range(epochs):
            y_pred = self.forward(X)
            loss = np.mean((y_pred - y) ** 2)
            
            # Gradients
            dw = (2/m) * np.dot(X.T, (y_pred - y))
            db = (2/m) * np.sum(y_pred - y)
            
            self.W -= lr * dw
            self.b -= lr * db
            
            if epoch % 20 == 0:
                print(f"Epoch {epoch:3d} | Loss: {loss:.6f}")

if __name__ == "__main__":
    X_train = np.array([[1.0], [2.0], [3.0], [4.0]])
    y_train = np.array([[2.0], [4.0], [6.0], [8.0]])
    
    nn = SimpleNeuralNet(input_dim=1)
    nn.train(X_train, y_train, lr=0.05, epochs=100)
    print("Final weights:", nn.W.flatten(), "Bias:", nn.b.flatten())`,
      },
    ],
  },
  {
    id: 'proj-3',
    name: 'Modern SaaS Dashboard HTML/JS',
    description: 'Interactive responsive analytics dashboard with glassmorphism and live charts.',
    template: 'html',
    updatedAt: '2026-11-16 11:00',
    starred: false,
    files: [
      {
        id: 'f4',
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CodeSphere Analytics</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans p-8">
  <div class="max-w-4xl mx-auto">
    <header class="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
      <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">CodeSphere Metrics</h1>
      <button onclick="refreshData()" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition">Refresh Data</button>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p class="text-slate-400 text-sm">Active Builds</p>
        <p id="buildsCount" class="text-3xl font-bold mt-2 text-blue-400">24</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p class="text-slate-400 text-sm">Compilation Success</p>
        <p class="text-3xl font-bold mt-2 text-emerald-400">99.4%</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p class="text-slate-400 text-sm">Worker Latency</p>
        <p class="text-3xl font-bold mt-2 text-indigo-400">12ms</p>
      </div>
    </div>
  </div>
  <script>
    function refreshData() {
      const el = document.getElementById('buildsCount');
      const val = parseInt(el.innerText) + Math.floor(Math.random() * 5);
      el.innerText = val;
    }
  </script>
</body>
</html>`,
      },
    ],
  },
];

export const INITIAL_SNIPPETS: Snippet[] = [
  {
    id: 'snip-1',
    title: 'ESP32 Deep Sleep Wakeup on Timer',
    language: 'cpp',
    description: 'Configures ESP32 to enter deep sleep for 30 seconds and wake up via internal timer.',
    tags: ['ESP32', 'Power Management', 'Arduino'],
    code: `#include <esp_sleep.h>

#define uS_TO_S_FACTOR 1000000ULL
#define TIME_TO_SLEEP  30

void setup() {
  Serial.begin(115200);
  delay(1000);

  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial.println("Setup ESP32 to sleep for every " + String(TIME_TO_SLEEP) + " Seconds");
  
  Serial.println("Going to sleep now...");
  Serial.flush();
  esp_deep_sleep_start();
}

void loop() {
  // Never reached in deep sleep
}`,
    createdAt: '2026-11-15',
  },
  {
    id: 'snip-2',
    title: 'Fast Asynchronous HTTP Fetch in Python',
    language: 'python',
    description: 'Concurrent requests using asyncio and httpx for fast web scraping.',
    tags: ['Python', 'Asyncio', 'Networking'],
    code: `import asyncio
import httpx

async def fetch(client, url):
    response = await client.get(url)
    return url, response.status_code

async def main():
    urls = [
        "https://httpbin.org/delay/1",
        "https://httpbin.org/json",
        "https://httpbin.org/uuid"
    ]
    async with httpx.AsyncClient() as client:
        tasks = [fetch(client, url) for url in urls]
        results = await asyncio.gather(*tasks)
        for url, status in results:
            print(f"{url} -> Status {status}")

if __name__ == "__main__":
    asyncio.run(main())`,
    createdAt: '2026-11-14',
  },
];

export const INITIAL_CHALLENGES: CodingChallenge[] = [
  {
    id: 'chal-1',
    title: 'Two Sum Algorithm',
    difficulty: 'Beginner',
    category: 'Algorithms',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    initialCode: `def two_sum(nums, target):
    # Write your solution here
    pass

print(two_sum([2, 7, 11, 15], 9)) # Expected: [0, 1]`,
    testCases: [
      { input: '[2, 7, 11, 15], 9', expected: '[0, 1]', description: 'Basic test case with first two elements' },
      { input: '[3, 2, 4], 6', expected: '[1, 2]', description: 'Test case with middle and end elements' },
    ],
  },
  {
    id: 'chal-2',
    title: 'Valid Palindrome Checker',
    difficulty: 'Beginner',
    category: 'Strings',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    initialCode: `def is_palindrome(s: str) -> bool:
    # Write your solution here
    pass

print(is_palindrome("A man, a plan, a canal: Panama")) # Expected: True`,
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expected: 'True', description: 'Classic palindrome sentence with punctuation' },
      { input: '"race a car"', expected: 'False', description: 'Non-palindrome string' },
    ],
  },
  {
    id: 'chal-3',
    title: 'ESP32 GPIO Debounce Filter',
    difficulty: 'Intermediate',
    category: 'Embedded / IoT',
    description: 'Implement a software debouncing algorithm for tactile pushbuttons connected to ESP32 GPIOs.',
    initialCode: `// Arduino C++ debounce function
bool checkButtonPress(int pin) {
  // Return true only when stable
  return false;
}`,
    testCases: [
      { input: 'Pin 23, 50ms pulse', expected: 'true', description: 'Stable press detection' },
    ],
  },
];

export const INITIAL_ARTIFACTS: BuildArtifact[] = [
  {
    id: 'art-1',
    filename: 'esp32_iot_station.bin',
    extension: '.bin',
    targetBoard: 'ESP32 DevKit',
    config: 'ESP-IDF v5.1 / Release / 4MB Flash',
    fileSize: '842 KB',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'SUCCESS',
    buildLogs: [
      'Configuring project for ESP32...',
      'Compiling main.ino with ESP32 Arduino Core 3.0...',
      'Generating partition table from partitions.csv...',
      'Linking binary and calculating checksums...',
      'Build completed successfully in 4.2s.',
    ],
    createdAt: '2026-11-18 14:32',
  },
  {
    id: 'art-2',
    filename: 'sensor_calibration_firmware.hex',
    extension: '.hex',
    targetBoard: 'Arduino Uno',
    config: 'AVR-GCC 12.2 / ATmega328P / 16MHz',
    fileSize: '24.5 KB',
    sha256: '8f434346648f6b96df89cca9b576dd6178bad306f9797205a964344421b444b0',
    status: 'SUCCESS',
    buildLogs: [
      'Invoking Arduino CLI compiler...',
      'Compiling Sketch for Arduino Uno (ATmega328P)...',
      'Memory usage: Flash 4200 bytes (13%), RAM 280 bytes (13%).',
      'HEX image written successfully.',
    ],
    createdAt: '2026-11-17 10:20',
  },
];
