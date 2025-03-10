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

'use client';

import type { ReactNode } from 'react';
import { ButtonSkeleton, SkeletonText } from '@carbon/react';
import { spacing } from '@carbon/layout';
import { moderate01 } from '@carbon/motion';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Agent } from '../api/types';
import { getAgentTitle } from '../utils';
import { AgentMetadata } from './AgentMetadata';
import { TagsList } from '#components/TagsList/TagsList.tsx';
import { CopySnippet } from '#components/CopySnippet/CopySnippet.tsx';
import { MarkdownContent } from '#components/MarkdownContent/MarkdownContent.tsx';
import { AgentDetailSection } from './AgentDetailSection';
import { AgentExampleRequests } from './AgentExampleRequests';
import { AgentTags } from './AgentTags';
import { BeeBadge } from './BeeBadge';
import { fadeProps } from '#utils/fadeProps.ts';
import commands from '#utils/commands.ts';
import classes from './AgentDetail.module.scss';

interface Props {
  agent: Agent;
  buttons?: ReactNode;
}

export function AgentDetail({ agent, buttons }: Props) {
  const { name, exampleInput, description, fullDescription } = agent;
  return (
    <div className={classes.root}>
      <motion.h1 {...fadeInPropsWithMarginShift({ start: { from: spacing[4] } })} className={classes.name}>
        {getAgentTitle(agent)}
        <BeeBadge agent={agent} size="lg" />
      </motion.h1>

      <motion.div {...fadeInPropsWithMarginShift({ start: { from: spacing[3] } })}>
        <AgentMetadata agent={agent} showGithub className={classes.metadata} />
        {description && <MarkdownContent className={classes.description}>{description}</MarkdownContent>}
        <AgentTags agent={agent} className={classes.tags} />
      </motion.div>

      <motion.div
        {...fadeInPropsWithMarginShift({ start: { from: spacing[6], to: spacing[5] } })}
        className={classes.buttons}
      >
        {buttons}
        <CopySnippet snippet={commands.beeai.run(name)} className={classes.copySnippet} />
      </motion.div>

      {(exampleInput || fullDescription) && (
        <motion.hr
          {...fadeInPropsWithMarginShift({
            start: { from: spacing[7], to: spacing[6] },
            end: { from: spacing[7], to: spacing[6] },
          })}
          className={classes.divider}
        />
      )}

      {exampleInput && (
        <AgentDetailSection title="Example requests">
          <AgentExampleRequests cli={commands.beeai.run(name, exampleInput)} />
        </AgentDetailSection>
      )}

      {fullDescription && (
        <AgentDetailSection title="Description" titleSpacing="large">
          <MarkdownContent className={classes.fullDescription}>{fullDescription}</MarkdownContent>
        </AgentDetailSection>
      )}
    </div>
  );
}

AgentDetail.Skeleton = function AgentDetailSkeleton() {
  return (
    <div className={classes.root}>
      <SkeletonText className={classes.name} width="50%" />

      <AgentMetadata.Skeleton className={classes.metadata} />

      <div className={classes.description}>
        <SkeletonText paragraph lineCount={3} />
      </div>

      <TagsList.Skeleton length={2} className={classes.tags} />

      <div className={classes.buttons}>
        {/* .cds--layout--size-md fixes Carbon bug where button size prop is not respected */}
        <ButtonSkeleton size="md" className={clsx('cds--layout--size-md', classes.launchButton)} />

        <ButtonSkeleton size="md" className={clsx('cds--layout--size-md', classes.copySnippet)} />
      </div>

      <hr className={classes.divider} />

      <AgentDetailSection.Skeleton titleWidth="10rem" lineCount={6} />
    </div>
  );
};

function fadeInPropsWithMarginShift({
  start,
  end,
}: {
  start?: { from: string; to?: string };
  end?: { from: string; to?: string };
}) {
  return fadeProps({
    hidden: {
      marginBlockStart: start ? start.from : undefined,
      marginBlockEnd: end ? end.from : undefined,
    },
    visible: {
      marginBlockStart: start ? start.to || 0 : undefined,
      marginBlockEnd: end ? end.to || 0 : undefined,
      transition: { delay: Number.parseFloat(moderate01) / 1000 },
    },
  });
}
