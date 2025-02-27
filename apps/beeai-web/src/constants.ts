/**
 * Copyright 2025 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const BEEAI_HOST_ENV = process.env.BEEAI_HOST;
if (!BEEAI_HOST_ENV) {
  throw new Error("ENV \"BEEAI_HOST_ENV\" must be defined!");
}

export const BEEAI_HOST = BEEAI_HOST_ENV;
