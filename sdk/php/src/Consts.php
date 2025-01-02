<?php

namespace starfederation\datastar;

use starfederation\datastar\enums\FragmentMergeMode;

/**
 * This is auto-generated by Datastar. DO NOT EDIT.
 */
class Consts
{
    public const DATASTAR_KEY = 'datastar';
    public const VERSION = '1.0.0-beta1';

    // The default duration for settling during fragment merges. Allows for CSS transitions to complete.
    public const DEFAULT_FRAGMENTS_SETTLE_DURATION = 300;

    // The default duration for retrying SSE on connection reset. This is part of the underlying retry mechanism of SSE.
    public const DEFAULT_SSE_RETRY_DURATION = 1000;

    // Should fragments be merged using the ViewTransition API?
    public const DEFAULT_FRAGMENTS_USE_VIEW_TRANSITIONS = false;

    // Should a given set of signals merge if they are missing?
    public const DEFAULT_MERGE_SIGNALS_ONLY_IF_MISSING = false;

    // Should script element remove itself after execution?
    public const DEFAULT_EXECUTE_SCRIPT_AUTO_REMOVE = true;

    // The default attributes for <script/> element use when executing scripts. It is a set of of key-value pairs delimited by a newline \\n character.}
    public const DEFAULT_EXECUTE_SCRIPT_ATTRIBUTES = 'type module';

    // The mode in which a fragment is merged into the DOM.
    public const DEFAULT_FRAGMENT_MERGE_MODE = FragmentMergeMode::Morph;

    // Dataline literals.
    public const SELECTOR_DATALINE_LITERAL = 'selector ';
    public const MERGE_MODE_DATALINE_LITERAL = 'mergeMode ';
    public const SETTLE_DURATION_DATALINE_LITERAL = 'settleDuration ';
    public const FRAGMENTS_DATALINE_LITERAL = 'fragments ';
    public const USE_VIEW_TRANSITION_DATALINE_LITERAL = 'useViewTransition ';
    public const SIGNALS_DATALINE_LITERAL = 'signals ';
    public const ONLY_IF_MISSING_DATALINE_LITERAL = 'onlyIfMissing ';
    public const PATHS_DATALINE_LITERAL = 'paths ';
    public const SCRIPT_DATALINE_LITERAL = 'script ';
    public const ATTRIBUTES_DATALINE_LITERAL = 'attributes ';
    public const AUTO_REMOVE_DATALINE_LITERAL = 'autoRemove ';
}