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

import { ThemeToggle } from '#components/ThemeToggle/ThemeToggle.tsx';
import { CommunityNav } from '../CommunityNav/CommunityNav';
import classes from './AppFooter.module.scss';
import { Container } from './Container';

interface Props {
  className?: string;
  showThemeToggle?: boolean;
}

export function AppFooter({ className, showThemeToggle = true }: Props) {
  return (
    <footer className={className}>
      <Container size="max">
        <div className={classes.holder}>
          {showThemeToggle && <ThemeToggle />}

          <CommunityNav className={classes.communityNav} />
        </div>
      </Container>
    </footer>
  );
}
